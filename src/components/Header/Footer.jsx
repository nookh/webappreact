import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user, onClose} = useTelegram();
    console.log(user);
    return (
        <div className={'header'}>
            <span className={'username'}>
              {user?.first_name}
            </span>
        </div>
    );
};

export default Header;
