import React from 'react';
import authService from 'api/api-authorization/AuthorizeService'
import { Button, Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import * as Api from "api/Requests"
import { LoadingAndErrors, MyCarousel, Converters } from "components/common"
import * as FA from 'react-icons/fa'
import { Link } from 'react-router-dom';
import CommentForm from "components/campaigns/CommentForm"

export default function ReadPage(props) {
    const [campaign, isLoading, error] = Api.useGetRequest(Api.Routes.Campaign + props.match.params.id, [props.match.params.id]);
    const [user, setUser] = React.useState(undefined);

    React.useEffect(() => {
        authService.getUser().then(u => setUser(u));
    }, [])

    LoadingAndErrors({data: campaign, isLoading, error});
    return (
        <Container>
            <Row className="d-flex align-items-center justify-content-between">
                <h1>{campaign.name}</h1>
                {(campaign?.creatorId === user?.sub) && <Button as={Link} to={"/campaign/edit/" + props.match.params.id}>Edit</Button>}
            </Row>
            <Row className="d-flex align-items-center">
                <Col md="auto" className="p-0">
                    <h4><span className="text-warning">★ ★ ★ ★ ☆</span> 4.0&nbsp;</h4>
                </Col>
                <Col className="d-flex justify-content-end align-items-center p-0">
                    <FA.FaCoins />
                    <h4>&nbsp;$ __,__ <span className="text-black-50">(of $ {campaign.requiredAmount} goal)</span></h4>
                </Col>
            </Row>
            <Row className="d-flex justify-content-between align-items-center">
                <h4 className="text-black-50">{campaign?.creator?.userName}</h4>
            </Row>

            <Tabs fill variant="tabs" defaultActiveKey="description">
                <Tab eventKey="description" title="Description">
                    <Card>
                        <MyCarousel images={campaign.images} />
                        <Card.Body>{campaign.description}</Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="bonuses" title="Bonuses">
                </Tab>
                <Tab eventKey="news" title="News">
                </Tab>
                <Tab eventKey="comments" title="Comments">
                    <Card>
                        <Card.Header>Comments</Card.Header>
                        <Card.Body>
                            <CommentForm campaignId={campaign.id} />
                            {campaign.comments?.slice(0).reverse().map(comment => (
                                <div key={comment.id}>
                                    <p>{comment.body}</p>
                                    <small className="text-muted">Posted by {comment.creator.userName} on {Converters.toTimeHasPassed(comment.creatingDate)}</small>
                                    <hr />
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </Container>
    );
}
