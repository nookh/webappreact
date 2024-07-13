import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user, onClose} = useTelegram();
    console.log(user);
    return (
        <div className={'header'}>
            <img className={'image'} src={user?.photo_url} alt="eat"/>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;
