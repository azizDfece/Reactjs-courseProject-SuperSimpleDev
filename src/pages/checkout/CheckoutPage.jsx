import './checkout-header.css'
import './CheckoutPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { formatMoney } from '../../utils/money'
import { OrderSummary } from './OrderSummary'

function CheckoutPage({ cart }) {


    const [deliverOptions, setDeliverOptions] = useState([])
    const [paymentSummary, setPaymentSummary] = useState(null)
    const [isLoding, setIsLoding] = useState(true)
    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime').then(
            (response) => {
                setDeliverOptions(response.data)
            }
        )
        axios.get('/api/payment-summary').then(
            (response) => {
                setPaymentSummary(response.data)
                setIsLoding(false)

            }
        ).catch(e => console.log(e)
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
                    <OrderSummary cart={cart} deliverOptions={deliverOptions} />

                    <div className="payment-summary">
                        {isLoding ? <div className="loader-overlay">
                            <div className="spinner"></div> {/* هذا هو div الذي سيتحرك */}
                            <p>جاري تحميل الملخص...</p>
                        </div>
                            : <><div className="payment-summary-title">
                                Payment Summary
                            </div>

                                <div className="payment-summary-row">


                                    <div>Items
                                    </div>
                                    <div className="payment-summary-money">
                                        {paymentSummary.totalItems}
                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.shippingCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.taxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.totalCostCents)}
                                    </div>
                                </div>

                                <button className="place-order-button button-primary">
                                    Place your order
                                </button></>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutPage