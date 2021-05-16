import React from 'react'
import { useForm } from "react-hook-form";
import authService from 'api/api-authorization/AuthorizeService';
import * as Api from "api/Requests"
import axios from 'axios'

export default function CommentForm({campaignId}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [user, setUser] = React.useState(undefined);

    React.useEffect(() => {
        authService.getUser().then(u => setUser(u));
    }, [])

    const onSubmit = async (data) => {
        data.campaignId = campaignId;
        data.creatorId = user.sub;
        data.creatingDate = (new Date()).toISOString();

        const isAuthenticated = await authService.isAuthenticated;
        if (!isAuthenticated) return { error: "User is not Authenticated" };

        const token = await authService.getAccessToken();

        axios.post(Api.Routes.Comments, data, {
            headers: {Authorization: `Bearer ${token}`,},
        }).then(
            (result) => { reset() },
            (error) => { alert("Something went wrong, please try later\nError: " + error) }
        )
    }

    if (campaignId === undefined || campaignId === null) return (<strong>Error: campaignId = '{campaignId}'</strong>)
    if (user === null) return (
        <div>
            <strong>Leave a comments can only authorized users.</strong>
            <hr />
        </div>
    )
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <textarea rows={2} {...register("body", { required: true })} placeholder="Leave a comment..." className="form-control" />
                {errors.body && <small className="form-text text-danger">Field is invalid</small>}
            </div>
            <input type="submit" className="btn btn-primary" value="Send" />
            <hr />
        </form>
    )
}
