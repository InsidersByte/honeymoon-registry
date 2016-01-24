import React from 'react';
import { Image, Button } from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome.jsx';

import './GiftItem.styl';

class GiftItem extends React.Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.props.addToBasket(this.props.item, event);
    }

    render() {
        const item = this.props.item;
        const id = item._id;

        const basketItem = this.props.basketItems[id] || {};
        const outOfStock = item.remaining - basketItem.quantity <= 0;

        let button;

        if (outOfStock) {
            button = <Button disabled>Fully Gifted!</Button>;
        } else {
            button = (
                <Button bsStyle="success" onClick={this.onClick}>
                    <FontAwesome icon="shopping-basket" /> Add to Basket £ {item.price}
                </Button>
            );
        }

        const giftItemStyle = {
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'column',
        };

        return (
            <div className="gift-item" style={giftItemStyle}>
                <div style={{ flex: '1 1 0%', width: '100%' }}>
                    <Image src={item.imageUrl} className="gift-item--avatar" rounded />
                </div>

                <div style={{ padding: '8px' }}>
                    <h4>{item.name}</h4>
                    <p>Remaining: {item.remaining}</p>

                    {button}
                </div>
            </div>
        );
    }
}

GiftItem.propTypes = {
    item: React.PropTypes.object.isRequired,
    addToBasket: React.PropTypes.func.isRequired,
    basketItems: React.PropTypes.object.isRequired,
};

export default GiftItem;
