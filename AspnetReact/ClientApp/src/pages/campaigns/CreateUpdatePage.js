import React from 'react'
import * as Api from "api/Requests"

import { useForm, Controller } from "react-hook-form";

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { Converters, CenteredModal, MyCarousel, LoadingAndErrors } from 'components/common'

export default function CreateUpdatePage({ match }) {
    const id = match?.params?.id;
    const { register, handleSubmit, formState: { errors }, watch, control, reset, setValue } = useForm();
    const [dbCategories, dbTags, dbDataIsLoading, dbDataErrors] = Api.useGetCategoriesAndTags();

    let [campaign, isLoading, error] = (id !== undefined && id !== null) 
        ? Api.useGetRequest(Api.Routes.Campaign + id, [id]) 
        : [undefined, false, null];
    const [modalShow, setModalShow] = React.useState(false);
    
    React.useEffect(async () => {
        if (!campaign.id) return;
        setValue("name", campaign.name);
        setValue("neededSum", campaign.neededSum);
        setValue("categoryId", campaign.categoryId);
        setValue("description", campaign.description);
        setValue("tagNames", campaign.tags?.map(v => { return v.name }));

        if (!campaign.images) return;
        let dataTransfer = new DataTransfer();
        for (let i in campaign.images) {
            let file = await getFileFromUrl(Api.Routes.Uploads + campaign.images[i].url, campaign.images[i].url)
            dataTransfer.items.add(file);
        }
        setValue("images", dataTransfer.files);
    }, [campaign])


    const onSubmit = async (data) => {
        let method = (id !== undefined && id !== null) ? 'PUT' : 'POST';
        Api.sendCampaignDataFromForm(method, document.querySelector("form"), data, id)
            .then(
                (result) => { setModalShow(true) },
                (error) => { alert("Something went wrong, please try later\nError: " + error) }
            );
    }
    LoadingAndErrors({campaign, isLoading, error});
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{id !== undefined ? "Update" : "Create"} Campaign</h1>
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
                        render={({ field: { onChange, value } }) => (
                            <Select isClearable={true} isSearchable={true} name="categoryId"
                                options={Converters.toSelectItems(dbCategories)}
                                onChange={val => onChange(val?.value)}
                                value={Converters.toSelectItem(dbCategories.find(t => t.id === value))}
                            />
                        )}
                    />
                    {errors.categoryId && <small className="form-text text-danger">Field is invalid</small>}
                </div>
                <div className="form-group">
                    <label className="form-label">Tags</label>
                    <Controller name="tagNames" control={control} rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <CreatableSelect isMulti isClearable name="tagNames"
                                options={dbTags?.map(v => { return { value: v.name, label: v.name } })}
                                onChange={values => onChange(values?.map(v => { return v.value }))}
                                value={value?.map(v => { return { value: v, label: v } })}
                            />
                        )}
                    />
                    {errors.tagNames && <small className="form-text text-danger">Field is invalid</small>}
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea rows="5" {...register("description", { required: true })} placeholder="Description" type="text" className="form-control" />
                    {errors.description && <small className="form-text text-danger">Field is invalid</small>}
                </div>
                <MyCarousel images={watch("images")} />
                <div className="form-group">
                    <div className="custom-file">
                        <input {...register("images")} type="file" multiple
                            accept="image/*" className="custom-file-input" style={{ zIndex: 1 }} />
                        <label className="custom-file-label" style={{ zIndex: 0 }}>{getFileLabel(watch("images"))}</label>
                    </div>
                    {errors.images && <small className="form-text text-danger">Field is invalid</small>}
                </div>

                <input type="submit" className="btn btn-primary" value="Send" />

                <CenteredModal show={modalShow} onHide={() => setModalShow(false)} backdrop="static" keyboard={false}
                    title="Great" body="The campaign was loaded successfully" />
            </form>
        </>
    );
}

function getFileLabel(fileList) {
    return fileList?.length
        ? fileList.length + " files selected: " + Array.from(fileList).map(f => { return f.name }).join(", ")
        : "Select files..."
}

async function getFileFromUrl(url, name, defaultType = 'image/jpeg'){
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
      type: response.headers.get('content-type') || defaultType,
    });
  }
  
