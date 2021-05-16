import authService from 'api/api-authorization/AuthorizeService';
import React from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import * as Api from "api/Requests"
import { LoadingAndErrors } from "components/common"
import { FaEdit, FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


export default function Campaigns() {
    const [user, setUser] = React.useState(undefined);
    const [campaigns, isLoading, error] = Api.useGetRequest(Api.Routes.CampaignByUserId + user?.sub, [user]);

    React.useEffect(() => {
        authService.getUser().then(u => setUser(u));
    }, [])

    const columns = [
        {
            headerStyle: () => { return { verticalAlign: "text-top", width: "70px" }; },
            dataField: 'id',
            text: 'Id',
            filter: textFilter({placeholder: 'Filter'}),
            sort: true,
        },
        {
            headerStyle: () => { return { verticalAlign: "text-top" }; },
            dataField: 'name',
            text: 'Campaign name',
            filter: textFilter({placeholder: 'Filter'}),
            sort: true,
        },
        {
            headerStyle: () => { return { verticalAlign: "text-top" }; },
            dataField: 'category.name',
            text: 'Category',
            filter: textFilter({placeholder: 'Filter'}),
            sort: true,
        },
        {
            headerStyle: () => { return { verticalAlign: "text-top" }; },
            dataField: 'requiredAmount',
            text: 'Required Amount',
            filter: textFilter({placeholder: 'Filter'}),
            sort: true,
        },
        {
            headerStyle: () => { return { verticalAlign: "text-top", width: "150px" }; },
            text: "Actions",
            dataField: "id",
            formatter: (i) => {
                return (
                    <div>
                        <Button className="mx-1" size="sm" as={Link} to={"/campaign/" + i} variant="primary"><FaEye /></Button>
                        <Button className="mx-1" size="sm" as={Link} to={"/campaign/edit/" + i} variant="success"><FaPen /></Button>
                        <Button className="mx-1" size="sm" as={Link} to="" variant="danger"><FaTrash /></Button>
                    </div>
                )
            },
        }
    ];



    LoadingAndErrors({ data: campaigns, isLoading, error });
    return (
        <Container>
            <Row className="d-flex align-items-center justify-content-between">
                <h1>My campaigns</h1>
                <Button as={Link} to="/campaign/create/"><FaEdit /> Create</Button>
            </Row>

            <BootstrapTable keyField='id' data={campaigns} columns={columns} filter={filterFactory()} />
        </Container>
    )
}
