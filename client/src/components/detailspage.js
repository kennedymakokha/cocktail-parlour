import React, { Component } from 'react'
import { fetchsinglecocktaile } from './../axios/actions/cocktails'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Row, Col, Button,Spinner } from 'react-bootstrap';
class detailspage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }
    componentDidMount = async () => {
        // console.log(this.props.data)
        const id = this.props.data1.idDrink
        await this.props.fetchsinglecocktaile(id)
        this.setState({ data: this.props.cocktail })

    }
    render() {
        const { data } = this.state
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

            <div className="container" style={{ border: 'solid #ccc 1px', paddingBottom: '50px' }}>
                <div className='header-container'>
                    <div className='header-section'>
                        <h6>TOP LEVEL COMBINATIONS</h6>
                        <h1 className="auto" >{data.strDrink}</h1>
                    </div>

                </div>
                <Row className='cockdetail' >

                    <Col xs={12} md={4}  >
                        <div className="image-container">
                            <img src={data.strDrinkThumb} alt="i" className="cocktail-image" />
                        </div>
                    </Col>
                    <Col xs={12} md={8} className='' >
                        <div ><h3 className='auto'>Category</h3>{data.strAlcoholic}</div>
                        <Row >

                            <Col xs={12} md={4} className='' >
                                <h3 className='auto'>Ingredients</h3>
                                <ul>
                                    {data.strIngredient1 !== null ? <li>{data.strIngredient1}</li> : null}
                                    {data.strIngredient2 !== null ? <li>{data.strIngredient2}</li> : null}
                                    {data.strIngredient3 !== null ? <li>{data.strIngredient3}</li> : null}
                                    {data.strIngredient4 !== null ? <li>{data.strIngredient4}</li> : null}
                                    {data.strIngredient5 !== null ? <li>{data.strIngredient5}</li> : null}
                                    {data.strIngredient6 !== null ? <li>{data.strIngredient6}</li> : null}
                                    {data.strIngredient7 !== null ? <li>{data.strIngredient7}</li> : null}
                                    {data.strIngredient8 !== null ? <li>{data.strIngredient8}</li> : null}
                                    {data.strIngredient9 !== null ? <li>{data.strIngredient9}</li> : null}
                                    {data.strIngredient10 !== null ? <li>{data.strIngredient10}</li> : null}
                                    {data.strIngredient11 !== null ? <li>{data.strIngredient11}</li> : null}
                                    {data.strIngredient12 !== null ? <li>{data.strIngredient12}</li> : null}
                                    {data.strIngredient13 !== null ? <li>{data.strIngredient13}</li> : null}
                                    {data.strIngredient14 !== null ? <li>{data.strIngredient14}</li> : null}
                                    {data.strIngredient15 !== null ? <li>{data.strIngredient15}</li> : null}


                                </ul>
                            </Col>


                            <Col xs={12} md={4} className='' >
                                <h3 className='auto'>Measures</h3>
                                <ul>
                                    {data.strMeasure1 !== null ? <li>{data.strMeasure1}</li> : null}
                                    {data.strMeasure2 !== null ? <li>{data.strMeasure2}</li> : null}
                                    {data.strMeasure3 !== null ? <li>{data.strMeasure3}</li> : null}
                                    {data.strMeasure4 !== null ? <li>{data.strMeasure4}</li> : null}
                                    {data.strMeasure5 !== null ? <li>{data.strMeasure5}</li> : null}
                                    {data.strMeasure6 !== null ? <li>{data.strMeasure6}</li> : null}
                                    {data.strMeasure7 !== null ? <li>{data.strMeasure7}</li> : null}
                                    {data.strMeasure8 !== null ? <li>{data.strMeasure8}</li> : null}
                                    {data.strMeasure9 !== null ? <li>{data.strMeasure9}</li> : null}
                                    {data.strMeasure10 !== null ? <li>{data.strMeasure10}</li> : null}
                                    {data.strMeasure11 !== null ? <li>{data.strMeasure11}</li> : null}
                                    {data.strMeasure12 !== null ? <li>{data.strMeasure12}</li> : null}
                                    {data.strMeasure13 !== null ? <li>{data.strMeasure13}</li> : null}
                                    {data.strMeasure14 !== null ? <li>{data.strMeasure14}</li> : null}
                                    {data.strMeasure15 !== null ? <li>{data.strIngredient15}</li> : null}


                                </ul>
                            </Col>
                        </Row>
                        <div><h3 className='auto'>Instruction</h3>{data.strInstructions}</div>
                    </Col>


                </Row>
                <div className="backBtn"><Button onClick={() => this.props.navigateback()}>Back</Button></div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cocktail: state.cocktailsData.cocktail,
        loading: state.cocktailsData.loading
    }

};
export default connect(mapStateToProps, { fetchsinglecocktaile })(withRouter(detailspage));
// export default connect(mapStateToProps, { fetchsinglecocktaile })(detailspage);
