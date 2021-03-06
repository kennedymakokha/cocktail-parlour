import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'

export default class layout extends Component {
    render() {
        return (
            <div className="container">
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/">
                        <img src="./download.png" alt="" style={{ height: '60px', width: '60px', objectFit: 'cover', marginLeft: '40px' }} />
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link  href="/">Home</Nav.Link>
                        <Nav.Link href="/custom-cocktails">Custom Cocktails</Nav.Link>
                        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search for cust</Button>
                    </Form> */}
                </Navbar>
                {this.props.children}
            </div>
        )
    }
}
