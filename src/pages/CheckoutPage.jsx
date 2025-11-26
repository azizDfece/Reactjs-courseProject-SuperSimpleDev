import './checkout-header.css'
import './CheckoutPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { formatMoney } from '../utils/money'
import dayjs from 'dayjs'

function CheckoutPage({ cart }) {


    const [deliverOptions, setDeliverOptions] = useState([])
    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime').then(
            (response) => {
                setDeliverOptions(response.data)
            }
        )
    }, [])

    return (
        <>
            <title>Checkout</title>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">3 items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {deliverOptions.length > 0 && cart.map((cartItem) => {
                            const selectedDeliveryOptions = deliverOptions.find(
                                (dO) => {

                                    return dO.id === cartItem.deliveryOptionId
                                }
                            )
                            console.log(selectedDeliveryOptions);

                            return (
                                <div key={cartItem.productId} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date: {dayjs(selectedDeliveryOptions.estimatedDeliveryTimeMs).format(`dddd , MMMM d`)}

                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartItem.product.name}
                                            </div>
                                            <div className="product-price">
                                                {formatMoney(cartItem.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">2</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>
                                            {deliverOptions.map((dI) => {
                                                let PriceString = `Free Shipping`
                                                if (dI.priceCents > 0) {
                                                    PriceString = `${formatMoney(dI.priceCents)} - Shipping`
                                                }
                                                return (
                                                    <div key={dI.id} className="delivery-option">
                                                        <input type="radio"
                                                            checked={dI.id === cartItem.deliveryOptionId}
                                                            className="delivery-option-input"
                                                            name={`delivery-option-${cartItem.productId}`} />
                                                        <div>
                                                            <div className="delivery-option-date">
                                                                {dayjs(dI.estimatedDeliveryTimeMs).format('dddd, MM D')}
                                                            </div>
                                                            <div className="delivery-option-price">
                                                                {PriceString}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items (3):</div>
                            <div className="payment-summary-money">$42.75</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">$4.99</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">$47.74</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">$4.77</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">$52.51</div>
                        </div>

                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutPage