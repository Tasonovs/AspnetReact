import React, { useEffect, useState } from 'react'
import authService from '../api-authorization/AuthorizeService'
import * as Api from "../api-controller/Requests"
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import CenteredModal from '../common/CenteredModal'

export default function CreatePage() {
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const [dbCategories, setDbCategories] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    Api.getDataWithHook(Api.Routes.Category, setDbCategories);
    Api.getDataWithHook(Api.Routes.Tag, setDbTags);
  }, [])

  const onSubmit = async (data) => {
    data.creatingDate = new Date();
    Api.authorizedPost(Api.Routes.Campaign, data)
      .then(
        (result) => { setModalShow(true) },
        (error) => { alert("Something went wrong, please try later") }
      )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Campaign create</h1>
      <div className="form-group">
        <label className="form-label">Project name</label>
        <input {...register("name", { required: true })} placeholder="Project name" type="text" className="form-control" />
        {errors.name && <small className="form-text text-danger">Field is invalid</small>}
      </div>
      <div className="form-group">
        <label className="form-label">Needed sum</label>
        <input {...register("neededSum", { required: true })} placeholder="Needed sum" type="number" className="form-control" />
        {errors.neededSum && <small className="form-text text-danger">Field is invalid</small>}
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <Controller name="categoryId" control={control} rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <Select isClearable={true} isSearchable={true}
              inputRef={ref}
              options={dbCategories.map((c) => { return { value: c.id, label: c.name } })}
              onChange={val => onChange(val?.value)}
            />
          )}
        />
        {errors.categoryId && <small className="form-text text-danger">Field is invalid</small>}
      </div>
      <div className="form-group">
        <label className="form-label">Tags</label>
        <Controller name="tags" control={control} rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <CreatableSelect isMulti isClearable
              options={dbTags.map((t) => { return { value: t.id, label: t.name } })}
              onChange={val => onChange(val?.map(e => { return { name: e.label } }))} //, name: e.label
            />
          )}
        />
        {errors.tags && <small className="form-text text-danger">Field is invalid</small>}
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea {...register("description", { required: true })} placeholder="Description" type="text" className="form-control" />
        {errors.description && <small className="form-text text-danger">Field is invalid</small>}
      </div>

      <input type="submit" className="btn btn-primary" value="Send" />
      <CenteredModal show={modalShow} onHide={() => setModalShow(false)} backdrop="static" keyboard={false}
        title="Great" body="The campaign was successfully created" />
    </form>
  );
}