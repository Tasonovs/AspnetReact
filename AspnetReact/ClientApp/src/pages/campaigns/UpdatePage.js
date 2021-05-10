import React from 'react'
import { useForm, Controller } from "react-hook-form";
import * as Api from "api/Requests"
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import CenteredModal from 'components/common/CenteredModal'
import * as Converters from 'components/common/Converters'


export default function UpdatePage({match}) {
  const { register, handleSubmit, watch, formState: { errors }, control, reset } = useForm();

  const [dbCategories, setDbCategories] = React.useState([]);
  const [dbTags, setDbTags] = React.useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    Api.getDataWithHook(Api.Routes.Category, setDbCategories);
    Api.getDataWithHook(Api.Routes.Tag, setDbTags);

    fetch(Api.Routes.Campaign + match.params.id).then(res => res.json())
      .then(
        (result) => { reset(result); setIsLoaded(true); },
        (error) => { setError(error); setIsLoaded(true); }
      );
  }, [match.params.id])

  const onSubmit = (data) => {
  }
  if (error) return <div>Ошибка: {error.message}</div>;
  else if (!isLoaded) return <div>Загрузка...</div>;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Update Campaign</h1>
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
            <Select isClearable={true} isSearchable={true}
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
        <Controller name="tags" control={control} rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CreatableSelect isMulti isClearable
              options={Converters.toSelectItems(dbTags)}
              onChange={vals => onChange(Converters.toIdNameObjects(vals))} // vals?.map(v => { return { id: v.value, name: v.label } })
              value={Converters.toSelectItems(value)} // value?.map((t) => { return { value: t.id, label: t.name }})
            />
          )}
        />
        {errors.tags && <small className="form-text text-danger">Field is invalid</small>}
      </div>
      <div className="form-group">
        <div className="custom-file">
          <input {...register("images", { min: 1, minLength: 1 })} type="file" multiple accept="image/*" className="custom-file-input" />
          <label className="custom-file-label">{getFileLabel(watch("images"))}</label>
        </div>
        {errors.images && <small className="form-text text-danger">Field is invalid</small>}
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea {...register("description", { required: true })} placeholder="Description" type="text" className="form-control" />
        {errors.description && <small className="form-text text-danger">Field is invalid</small>}
      </div>

      <input type="submit" className="btn btn-primary" value="Send" />

      <CenteredModal show={modalShow} onHide={() => setModalShow(false)} backdrop="static" keyboard={false}
        title="Great" body="The campaign was successfully updated" />
    </form>
  );
}

function getFileLabel(fileList) {
  return fileList?.length
    ? fileList.length + " files selected: " + Array.from(fileList).map(f => { return f.name }).join(", ")
    : "Select files..."
}
