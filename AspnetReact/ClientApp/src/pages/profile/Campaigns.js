import authService from 'api/api-authorization/AuthorizeService';
import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import * as Api from "api/Requests"
import { LoadingAndErrors } from "components/common"
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Campaigns() {
    const [user, setUser] = React.useState(undefined);
    const [campaigns, isLoading, error] = Api.useGetRequest(Api.Routes.CampaignByUserId + user?.sub, [user]);

    React.useEffect(() => {
        authService.getUser().then(u => setUser(u));
    }, [])
    
    LoadingAndErrors({data: campaigns, isLoading, error});
    return (
        <Container>
            <h1>My campaigns</h1>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Campaign name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map(campaign => (
                        <tr>
                            <td>{campaign.id}</td>
                            <td>{campaign.name}</td>
                            <td>{campaign.creatingDate}</td>
                            <td>
                                <Button className="m-1" as={Link} to={"/campaign/" + campaign.id} variant="primary"><FaEye /></Button>
                                <Button className="m-1" as={Link} to={"/campaign/edit/" + campaign.id} variant="success"><FaPen /></Button>
                                <Button className="m-1" as={Link} to="" variant="danger"><FaTrash /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}
