import React from 'react';
import authService from 'api/api-authorization/AuthorizeService'
import { Button, Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import * as Api from "api/Requests"
import { LoadingAndErrors, MyCarousel, Converters } from "components/common"
import { FaCoins, FaEdit, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import CommentForm from "components/campaigns/CommentForm"
import './Read.css'

export default function ReadPage(props) {
    const [campaign, isLoading, error] = Api.useGetRequest(Api.Routes.Campaign + props.match.params.id, [props.match.params.id]);
    const [user, setUser] = React.useState(undefined);

    React.useEffect(() => {
        authService.getUser().then(u => setUser(u));
    }, [])

    function AverageRatingGrade(ratings = []) {
        let sum = ratings?.reduce((total, rating) => total + rating.grade, 0);
        return (sum / ratings?.length);
    }

    function GradeToRatingStars(grade = 0) {
        function checkAndReturnColor(condition) { if (condition) { return "orange" } else { return "gray" } }
        return (
            <>
                <FaStar className="p-0 m-0" color={checkAndReturnColor(grade >= 1)} />
                <FaStar className="p-0 m-0" color={checkAndReturnColor(grade >= 2)} />
                <FaStar className="p-0 m-0" color={checkAndReturnColor(grade >= 3)} />
                <FaStar className="p-0 m-0" color={checkAndReturnColor(grade >= 4)} />
                <FaStar className="p-0 m-0" color={checkAndReturnColor(grade >= 5)} />
            </>
        )
    }

    return (
        <LoadingAndErrors data={campaign} isLoading={isLoading} error={error}>
            <Row className="d-flex align-items-center justify-content-between">
                <h1>{campaign.name}</h1>
                {(campaign?.creator?.id === user?.sub) &&
                    <Button as={Link} to={"/campaign/edit/" + props.match.params.id}><FaEdit /> Edit</Button>}
            </Row>
            <Row className="d-flex align-items-end">
                <Col md="auto" className="px-1">
                    <h5>{GradeToRatingStars(AverageRatingGrade(campaign.ratings))}</h5>
                </Col>
                <Col md="auto" className="px-1">
                    <h5 className="text-black-50">({AverageRatingGrade(campaign.ratings).toFixed(1)})</h5>
                </Col>
                <Col md="auto" className="px-1">
                    <h5>{campaign.ratings?.length} ratings&nbsp;</h5>
                </Col>
                <Col className="d-flex justify-content-end align-items-center p-0">
                    <FaCoins />
                    <h5>&nbsp;$ __,__ <span className="text-black-50">(of $ {campaign.requiredAmount} goal)</span></h5>
                </Col>
            </Row>
            <Row className="d-flex justify-content-between align-items-center">
                <h5 className="text-black-50">{campaign?.creator?.userName}</h5>
            </Row>

            <Tabs fill variant="tabs" defaultActiveKey="description">
                <Tab eventKey="description" title="Description">
                    <MyCarousel images={campaign.images} />
                    <ReactMarkdown className="m-2" remarkPlugins={[gfm]} children={campaign.description} />
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
                            {campaign.comments?.map(comment => (
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
        </LoadingAndErrors>
    );
}
