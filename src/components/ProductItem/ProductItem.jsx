import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }
    const {title, description, price, photo} = product;

    return (
        <div className={'product ' + className}>
            <img className={'img'} src={photo} alt="eat"/>
            <div className={'title'}>{title}</div>
            <div className={'description'}>{description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;
