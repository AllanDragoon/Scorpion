import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const HeaderComp = ({ title, menu }) => (
    <div>
        <h1>{title}</h1>
        <ul>
            {
                menu.map((item) => (
                    <li key={item}>{item}</li>
                ))
            }
        </ul>
    </div>
);

HeaderComp.propTypese = {
    title: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(PropTypes.string.isrequired).isRequired
};

const mapStateToProps = (state) => ({
    title: state.ui.header.title,
    menu: state.ui.header.headerMenu
});

const Header = connect(mapStateToProps)(HeaderComp);

export default Header;