import React from 'react';
import { Navbar, Nav, Form, FormControl, InputGroup, Dropdown, Image } from 'react-bootstrap';
import { FaSearch, FaTv, FaBell } from 'react-icons/fa';
import adminImage from '../../assets/adminImage.png';
import { Link } from 'react-router-dom';
const Top = () => {
    return (
        <Navbar
            expand="lg"
            fixed="top"  // Fixed at the top
            style={{
                backgroundColor: '#1E293B',
                padding: '10px 20px',
                width: '100%',  // Full width
                marginBottom: '20px',  // Increased bottom margin
                zIndex: '1000'  // Ensures it's above other elements
            }}
        >
            <Navbar.Brand className="text-white" style={{ fontWeight: 'bold', color: 'white' }}>
            <Link to='/admin' style={{ color: 'white', textDecoration: 'none' }}>BIT CO-PO Admin DashBoard</Link>
        </Navbar.Brand>

            <Form className="d-flex mx-auto" style={{ width: '400px' }}> {/* Increased width */}
                <InputGroup>
                    <InputGroup.Text style={{ backgroundColor: '#0F172A', border: 'none' }}>
                        <FaSearch style={{ color: '#9CA3AF' }} />
                    </InputGroup.Text>
                    <FormControl
                        type="search"
                        placeholder="Press / to search"
                        className="border-0"
                        style={{
                            backgroundColor: '#0F172A',
                            color: '#9CA3AF',
                            borderTopRightRadius: '20px',
                            borderBottomRightRadius: '20px'
                        }}
                    />
                </InputGroup>
            </Form>

            <Nav>
                <Nav.Link href="#" className="text-white mx-2">
                    <FaTv size={20} />
                </Nav.Link>
                <Nav.Link href="#" className="text-white mx-2" style={{ position: 'relative' }}>
                    <FaBell size={20} />
                    <span
                        style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            height: '10px',
                            width: '10px',
                            backgroundColor: 'red',
                            borderRadius: '50%',
                        }}
                    ></span>
                </Nav.Link>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="text-white d-flex align-items-center" style={{ textDecoration: 'none' }}>
                        <Image
                            src={adminImage} // Replace with your profile image URL
                            roundedCircle
                            style={{ width: '30px', height: '30px', marginRight: '5px' }}
                        />
                            ADMIN
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#">Profile</Dropdown.Item>
                        <Dropdown.Item href="#">Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#"><Link to='/' style={{ color: 'Black', textDecoration: 'none' }}>Logout</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Navbar>
    );
};

export default Top;
