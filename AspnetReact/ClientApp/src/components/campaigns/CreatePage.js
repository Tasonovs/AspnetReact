import React, { useEffect, useState } from 'react'
import * as Api from "../api-controller/Requests"

import { useForm, Controller } from "react-hook-form";

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import CenteredModal from '../common/CenteredModal'
import MyCarousel from '../common/MyCarousel'
import * as Converters from '../common/Converters'

import authService from '../api-authorization/AuthorizeService'

export default function CreatePage() {
  const { register, handleSubmit, formState: { errors }, watch, control } = useForm();
  const [dbCategories, dbTags, dbDataIsLoading, dbDataErrors] = Api.useGetCategoriesAndTags();
  const [modalShow, setModalShow] = useState(false);

  const onSubmit = async (data) => {
    Api.postCampaignDataFromForm(data, document.querySelector("form"))
      .then((result) => { setModalShow(true) }, (error) => { alert("Something went wrong, please try later 1") })
      .catch((error) => { alert("Something went wrong, please try later 2") });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create Campaign</h1>
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
                onChange={vals => onChange(vals?.map(v => { return v.value }))}
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
            <input {...register("images", { min: 1, minLength: 1 })} type="file" multiple 
              accept="image/*" className="custom-file-input" style={{ zIndex: 1 }} />
            <label className="custom-file-label" style={{ zIndex: 0 }}>{getFileLabel(watch("images"))}</label>
          </div>
          {errors.images && <small className="form-text text-danger">Field is invalid</small>}
        </div>

        <input type="submit" className="btn btn-primary" value="Send" />

        <CenteredModal show={modalShow} onHide={() => setModalShow(false)} backdrop="static" keyboard={false}
          title="Great" body="The campaign was successfully updated" />
      </form>
    </>
  );
}

function getFileLabel(fileList) {
  return fileList?.length
    ? fileList.length + " files selected: " + Array.from(fileList).map(f => { return f.name }).join(", ")
    : "Select files..."
}
