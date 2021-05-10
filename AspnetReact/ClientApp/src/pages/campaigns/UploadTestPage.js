import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import * as Api from "api/Requests"
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import {CenteredModal, Converters} from 'components/common/'
import axios from 'axios'


export default function UploadTestPage() {
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm();

    const [dbCategories, setDbCategories] = useState([]);
    const [dbTags, setDbTags] = useState([]);
    const [modalShow, setModalShow] = useState(false);
  
    console.log(watch("tagNames"));

    useEffect(() => {
      Api.getDataWithHook(Api.Routes.Category, setDbCategories);
      Api.getDataWithHook(Api.Routes.Tag, setDbTags);
    }, [])
  
    const onSubmit = (data) => {
        const formdata = Converters.toFormData(data);

        axios.post("/api/upload", formdata)
            .then((response) => {
                console.log(response);
                setModalShow(true);
            }, (error) => {
                console.log(error);
            });
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="form-label">Project name</label>
                    <input {...register("name", { required: true })} placeholder="Project name" type="text" className="form-control" />
                    {errors.name && <small className="form-text text-danger">Field is invalid</small>}
                </div>
                <div className="form-group">
                    <div className="custom-file">
                        <input {...register("images", { min: 1, minLength: 1 })} type="file" multiple accept="image/*" className="custom-file-input" />
                        <label className="custom-file-label">{getFileLabel(watch("images"))}</label>
                    </div>
                    {errors.images && <small className="form-text text-danger">Field is invalid</small>}
                </div>
                <div className="form-group">
                    <label className="form-label">Tags</label>
                    <Controller name="tagNames" control={control} rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <CreatableSelect isMulti isClearable
                                options={dbTags?.map(v => {return {value: v.name, label: v.name}})}
                                onChange={vals => onChange(vals?.map(v => {return v.value}))} // vals?.map(v => { return { id: v.value, name: v.label } })
                                value={value?.map(v => {return {value: v, label: v}})} // value?.map((t) => { return { value: t.id, label: t.name }})
                            />
                        )}
                    />
                    {errors.tagNames && <small className="form-text text-danger">Field is invalid</small>}
                </div>


                <input type="submit" className="btn btn-primary" value="Send" />
            </form>
            <CenteredModal show={modalShow} onHide={() => setModalShow(false)} backdrop="static" keyboard={false}
                title="Great" body="The images was uploaded" />
        </>
    )
}

function getFileLabel(fileList) {
    return fileList?.length
        ? fileList.length + " files selected: " + Array.from(fileList).map(f => { return f.name }).join(", ")
        : "Select files..."
}
