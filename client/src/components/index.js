import React, { Component } from 'react'
import './style.css'
import { fetch, fetchrandomcocktaile } from './../axios/actions/cocktails'
import { connect } from 'react-redux'
import Deatail from './detailspage'
import Layout from './layout';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            details: true,
            cocktail: {},
            loading: false
        }
    }
    navigate = async (d) => {
        this.setState({
            loading: true
        })
        setTimeout(() => {
            this.setState({
                details: false,
                cocktail: d,
                loading: false
            })
        }, 10);


    }
    randomDrink = async () => {
        this.setState({
            loading: this.props.loading
        })
        await this.props.fetchrandomcocktaile()
        this.setState({
            details: false,
            cocktail: this.props.cocktail
        })
    }
    navigateback = async () => {
        this.setState({
            details: true,
            cocktail: {}
        })

    }
    componentDidMount = async () => {
        await this.props.fetch()
        this.setState({
            data: this.props.cocktails,
            loading: this.props.loading
        })

    }

    render() {
        const { data, details, cocktail } = this.state
        if (this.props.loading) {
            return (
                <div className='loadingContainer'>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }
        return (
            <Layout>
                {details ?
                    <div className="container" style={{ border: 'solid #ccc 1px', backgroundColor: '#ededed' }}>
                        <div className='header-container'>

                            <div className='header-section'>
                                <h6>TOP LEVEL COMBINATIONS</h6>
                                <h1 >FRESH COCKTAILS</h1>
                            </div>

                        </div>
                        <Button onClick={() => this.randomDrink()}>Random Cocktail</Button>
                        <Row >
                            {data.slice(0, 9).map((d, i) => (
                                <Col xs={12} md={4} key={i} className='cocktainItem' >
                                    <div className="effect-image-1">
                                        <img src={d.strDrinkThumb} alt="i" />
                                        <div className="simple-text">
                                            <p>{d.strDrink}</p>
                                            <p>{d.strTags}</p>
                                        </div>
                                        <div className="overlay-sim-text-2 overlay-xs-1">
                                            <p>{d.strInstructions}</p>
                                            <div className="more-btn-container" > <Button onClick={() => this.navigate(d)}>Read More</Button></div>
                                        </div>
                                    </div>
                                </Col>
                            ))}

                        </Row>
                    </div> : <Deatail data1={cocktail} details={details} navigateback={this.navigateback} />
                } </Layout>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cocktails: state.cocktailsData.cocktails,
        cocktail: state.cocktailsData.cocktail,
        loading: state.cocktailsData.loading,
    }

};
export default connect(mapStateToProps, { fetch, fetchrandomcocktaile })(withRouter(index));
