import React, { useEffect, useState } from 'react'
import authService from '../api-authorization/AuthorizeService'
import { useForm } from "react-hook-form";
import Select from 'react-select'

export default function CreatePage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [errorCat, setErrorCat] = useState(null);
  const [isLoadedCat, setIsLoadedCat] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(async () => {
      await fetch("/api/category")
          .then(res => res.json())
          .then(
              (json) => { setIsLoadedCat(true); setCategories(json); },
              (error) => { setIsLoadedCat(true); setErrorCat(error); }
          )
  }, [])

  const onSubmit = async (data) => {
    const token = await authService.getAccessToken();
    const user = await authService.getUser();
    data.creatingDate = new Date();
    data.creatorId = user.sub;
    console.log(data);
    let dataString = JSON.stringify(data);
    fetch('/api/campaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length,
        'Credentials': 'same-origin',
        'Authorization': `Bearer ${token.toString()}`
      },
      body: dataString
    }).then((res) => {console.log("--------RESPONSE:");console.log(res.json())});
    
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
        <label className="form-label">Description</label>
        <textarea {...register("description", { required: true })} placeholder="Description" type="text" className="form-control" />
        {errors.description && <small className="form-text text-danger">Field is invalid</small>}
      </div>
      <div className="form-group">
        <label className="form-label">Needed sum</label>
        <input {...register("neededSum", { required: true })} placeholder="Needed sum" type="number" className="form-control" />
        {errors.neededSum && <small className="form-text text-danger">Field is invalid</small>}
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <select {...register("categoryId", { required: true })} type="text" className="form-control">
          <option value="" disabled>Select</option>
          {(isLoadedCat && !errorCat) && categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
        </select>
        {errors.categoryId && <small className="form-text text-danger">Field is invalid</small>}
      </div>
      <Select isMulti classNamePrefix="select" isClearable={true} isSearchable={true} options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]} />

      <input type="submit" className="btn btn-primary" value="Send" />
    </form>
  );
}


// function getRequest(url) {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [result, setResult] = useState({});

//   useEffect(() => {
//       fetch(url)
//           .then(res => res.json())
//           .then(
//               (json) => { setIsLoaded(true); setResult(json); },
//               (error) => { setIsLoaded(true); setError(error); }
//           )
//   }, [])

//   return {result, isLoaded, error};
// }



//TODO
// function Input({ tag, type, name, errorsDotName }) {
//   return (
//     <div className="form-group">
//       <label className="form-label">Project name</label>
//       <input {...register("name", { required: true })} placeholder="Project name" type="text" className="form-control" />
//       {errors.name && <small className="form-text text-danger">Field is invalid</small>}
//     </div>
//   )
// }