import React from 'react';
import { Jumbotron, FormGroup, ControlLabel, FormControl, Col, Row, ButtonToolbar, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import GiftSetApi from '../../api/giftSet.api';
import moment from 'moment';
import GiftTable from './GiftTable';
import { GIFT_SETS_ROUTE } from '../../constants/routes.constants';

export default class GiftSetPage extends React.Component {
    static propTypes = {
        toastSuccess: React.PropTypes.func,
        toastError: React.PropTypes.func,
        params: React.PropTypes.object.isRequired,
    };

    static defaultProps = {
        params: {},
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    state = {
        giftSet: {
            giver: {},
            gifts: [],
        },
    };

    componentDidMount() {
        this.loadGiftSet();
    }

    markAsPaid = () => {
        // TODO: Use a confirmation model instead of confirm
        if (!confirm('Are you sure you want to mark this gift as paid?')) {
            return;
        }

        const { giftSetId } = this.props.params;

        GiftSetApi
            .paid(this.state.giftSet, giftSetId)
            .then(() => {
                this.loadGiftSet();
                this.props.toastSuccess('Gift set marked as paid');
            })
            .catch((error) => {
                this.props.toastError('There was an error marking a gift set as paid', error);
            });
    };

    markAsDetailsSent = () => {
        // TODO: Use a confirmation model instead of confirm
        if (!confirm('Are you sure you want to mark this gift set as details sent?')) {
            return;
        }

        const { giftSetId } = this.props.params;

        GiftSetApi
            .detailsSent(this.state.giftSet, giftSetId)
            .then(() => {
                this.loadGiftSet();
                this.props.toastSuccess('Gift set marked as details sent');
            })
            .catch((error) => {
                this.props.toastError('There was an error marking a gift set as details sent', error);
            });
    };

    delete = () => {
        // TODO: Use a confirmation model instead of confirm
        if (!confirm('Are you sure you want to delete this gift set?')) {
            return;
        }

        const { giftSetId } = this.props.params;

        GiftSetApi
            .delete(giftSetId)
            .then(() => {
                this.context.router.push(GIFT_SETS_ROUTE);
                this.props.toastSuccess('Gift set deleted');
            })
            .catch((error) => {
                this.props.toastError('There was an error deleting a gift set', error);
            });
    };

    loadGiftSet() {
        const { giftSetId } = this.props.params;

        GiftSetApi
            .get(giftSetId)
            .then((response) => {
                this.setState({
                    giftSet: response,
                });
            })
            .catch((error) => {
                this.props.toastError('There was an error loading the gift set', error);
            });
    }

    render() {
        const fullName = `${this.state.giftSet.giver.forename} ${this.state.giftSet.giver.surname}`;
        const createdAt = moment(this.state.giftSet.createdAt);
        const createdAtFormatted = createdAt.format('DD/MM/YY HH:MM');

        return (
            <Jumbotron>
                <h1>Gift Set</h1>

                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <ControlLabel>Full Name</ControlLabel>
                            <FormControl.Static>
                                {fullName}
                            </FormControl.Static>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Email Address</ControlLabel>
                            <FormControl.Static>
                                {this.state.giftSet.giver.email}
                            </FormControl.Static>
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <ControlLabel>Phone Number</ControlLabel>
                            <FormControl.Static>
                                {this.state.giftSet.giver.phoneNumber}
                            </FormControl.Static>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Gift Date</ControlLabel>
                            <FormControl.Static>
                                {createdAtFormatted}
                            </FormControl.Static>
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <ControlLabel>Gift Total (£)</ControlLabel>
                            <FormControl.Static>
                                {this.state.giftSet.total}
                            </FormControl.Static>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Paid</ControlLabel>
                            <FormControl.Static>
                                {this.state.giftSet.paid ? 'Yes' : 'No'}
                            </FormControl.Static>
                        </FormGroup>
                    </Col>
                </Row>

                <h3>Gifts</h3>

                <GiftTable gifts={this.state.giftSet.gifts} />

                <ButtonToolbar>
                    <Link to="admin/giftSet" className="btn btn-primary" role="button">Back to Gift Sets</Link>

                    <Button
                        onClick={this.markAsDetailsSent}
                        bsStyle="success"
                        disabled={this.state.giftSet.detailsSent || this.state.giftSet.paid}
                    >
                        {
                            this.state.giftSet.detailsSent || this.state.giftSet.paid ?
                                'Already Marked as Details Sent or Paid' :
                                'Mark as Details Sent'
                        }
                    </Button>

                    <Button
                        onClick={this.markAsPaid}
                        bsStyle="success"
                        disabled={this.state.giftSet.paid}
                    >
                        {this.state.giftSet.paid ? 'Already Marked as Paid' : 'Mark as Paid'}
                    </Button>

                    <Button onClick={this.delete} bsStyle="danger" disabled={this.state.giftSet.paid}>Delete</Button>
                </ButtonToolbar>
            </Jumbotron>
        );
    }
}
