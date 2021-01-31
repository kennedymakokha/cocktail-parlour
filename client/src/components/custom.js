import React, { Component } from 'react'
import Layout from './layout';
import { withRouter } from 'react-router-dom';
import { post, fetchcustom, search } from './../axios/actions/cocktails'
import { connect } from 'react-redux'
import { Modal, Button, Form, Table, InputGroup, FormControl } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class custom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            data: [],
            fields: [{ value: null }],
            measure: [{ value: null }],
            name: '',
            instruction: '',
            category: '',
            searchKey: '',

        }
    }
    handleShow = () => {
        this.setState({
            show: true
        })
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }
    handleChange = (i, event) => {
        const values = [...this.state.fields];
        values[i].value = event.target.value;
        console.log(values)
        this.setState({
            fields: values
        })

    }

    handleAdd = () => {
        const values = [...this.state.fields];
        values.push({ value: null });
        this.setState({
            fields: values
        })

    }
    handleRemove = (i) => {
        const values = [...this.state.fields];
        values.splice(i, 1);
        this.setState({
            fields: values
        })
    }
    handlemeasure = (i, event) => {
        const values = [...this.state.measure];
        values[i].value = event.target.value;

        this.setState({
            measure: values
        })

    }

    handleAddmeasure = () => {
        const values = [...this.state.measure];
        values.push({ value: null });
        this.setState({
            measure: values
        })

    }
    handleRemovemeasure = (i) => {
        const values = [...this.state.measure];
        values.splice(i, 1);
        this.setState({
            measure: values
        })
    }
    handleinputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    notify = (message) => toast(`${message}`);
    handlesubmit = async () => {
        try {

            const measures = []
            const ingredients = []
            const { measure, fields, name, category, instruction } = this.state
            var i;
            for (i = 0; i < measure.length; i++) {

                measures.push(measure[i].value)
            }
            var j;
            for (j = 0; j < fields.length; j++) {
                console.log(fields[j].value)
                ingredients.push(fields[j].value)
            }
            const data = {
                name: name,
                category: category,
                instruction: instruction,
                ingredients: ingredients,
                measures: measures
            }
            this.setState({
                show: false
            })
            await this.props.post(data)
            await this.props.fetchcustom()
            this.setState({
                data: this.props.cocktails
            })
        } catch (error) {
            const errObj = error.response.data.error.errors;
            this.notify(`${Object.values(errObj)[0].properties.path} is required`)
            // console.log(Object.values(errObj)[0].properties.path)
        }

    }
    search = async () => {
        this.setState({
            data: this.props.cocktails
        })

    }
    componentDidMount = async () => {
        await this.props.fetchcustom()
        this.setState({
            data: this.props.cocktails
        })
    }
    render() {
        const { show, data, fields, measure } = this.state
        console.log(data)
        return (
            <Layout>
                <ToastContainer />
                <div className="container" style={{ border: 'solid #ccc 1px', backgroundColor: '#fff', padding: '100px' }}>
                    <Form inline>
                        <FormControl type="text" name='searchKey' placeholder="Search" onChange={(e) => this.handleinputChange(e)} className="mr-sm-2" />
                        <Button onClick={() => this.search()} >Search</Button>
                    </Form>

                    <Button style={{ float: 'right', marginBottom: '10px' }} variant="primary" onClick={() => this.handleShow()}>
                        Create </Button>
                    <Table responsive>
                        <thead>
                            <tr>

                                <th>Name </th>
                                <th>Category </th>
                                <th>ingredients </th>
                                <th>Measures </th>
                                <th>Instruction</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data !== undefined ? data.map((dat, i) => (<tr key={i}>

                                <td>{dat.name}</td>
                                <td>{dat.category}</td>
                                <td>
                                    {dat.ingredients.map(ink => (
                                        <ul style={{ listStyle: 'none' }}>
                                            <li>{ink}</li>
                                        </ul>

                                    ))}
                                </td>
                                <td>{dat.measures.map(mes => (
                                    <ul style={{ listStyle: 'none' }}>
                                        <li>{mes}</li>
                                    </ul>
                                ))}</td>
                                <td>{dat.instruction}</td>

                            </tr>)):null}

                        </tbody>
                    </Table>
                </div>
                <Modal show={show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Custom cocktail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group controlId="formBasicEmail3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" onChange={(e) => this.handleinputChange(e)} placeholder="Name" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail2">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="my-1 mr-sm-2"
                                    id="inlineFormCustomSelectPref"
                                    custom
                                    name='category'
                                    onChange={(e) => this.handleinputChange(e)}
                                >
                                    <option value="0">Choose...</option>
                                    <option value="alcoholic">Alcoholic</option>
                                    <option value="Non alcoholic">Non alcoholic</option>
                                    <option value="soft drink">Soft drink</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Ingedients</Form.Label>
                                <Button style={{ float: 'right', marginBottom: '5px' }} onClick={() => this.handleAdd()}> Add </Button>
                                {fields.map((field, id) => (
                                    <InputGroup className="mb-2" key={id}>
                                        <FormControl id={id} placeholder={`ingredient-${id}`} onChange={e => this.handleChange(id, e)} />
                                        <InputGroup.Prepend key={id}>
                                            <InputGroup.Text key={id} onClick={() => this.handleRemove(id)}>x</InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </InputGroup>
                                ))}

                            </Form.Group>
                            <Form.Group controlId="formBasicEmai">
                                <Form.Label>Measures</Form.Label>
                                <Button style={{ float: 'right', marginBottom: '5px' }} onClick={() => this.handleAddmeasure()}> Add </Button>
                                {measure.map((field, id) => (
                                    <InputGroup className="mb-2" key={id}>
                                        <FormControl id={id} placeholder={`measure-${id}`} onChange={e => this.handlemeasure(id, e)} />
                                        <InputGroup.Prepend key={id}>
                                            <InputGroup.Text key={id} onClick={() => this.handleRemovemeasure(id)}>x</InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </InputGroup>
                                ))}


                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Instruction</Form.Label>
                                <Form.Control as="textarea" name='instruction' onChange={(e) => this.handleinputChange(e)} rows={5} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
          </Button>
                        <Button variant="primary" onClick={() => this.handlesubmit()}>
                            Save Changes
          </Button>
                    </Modal.Footer>
                </Modal>
            </Layout>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cocktails: state.cocktailsData.custom,
        loading: state.cocktailsData.loading,
    }

};
export default connect(mapStateToProps, { post, fetchcustom, search })(withRouter(custom));
