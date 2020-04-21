import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import one from './img/1.jpg';
import two from './img/2.jpg';
import three from './img/3.jpg';

export default class Landing extends Component {
    render() {
        return (
            <div className="landing-body">

                <div className="top-item">
                    <div className="landing-login">
                        <Link to="/login" className="ui inverted basic button"> Log in</Link>
                    </div>
                    <div className="discip">
                        <h1>HOSTELS</h1>
                        <p>An online platform for booking hostels</p>
                        <Link to="/register" className="ui inverted basic button">Get Started</Link>
                    </div>
                </div>

                {/* photo gallery */}

                <div className="conatiner photo-g">
                    <h2 class="ui header">Photo Gallery </h2>
                    <div class="ui link cards three column doubling grid container">
                        <div class="card">
                            <div class="image">
                                <img src={one} />
                            </div>

                            <div class="content">
                                <div class="description">
                                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                    with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. York.
                            </div>
                            </div>

                        </div>

                        <div class="card">
                            <div class="image">
                                <img src={two} />
                            </div>

                            <div class="content">
                                <div class="description">
                                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                    with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. York.
                            </div>
                            </div>

                        </div>

                        <div class="card">
                            <div class="image">
                                <img src={three} />
                            </div>

                            <div class="content">
                                <div class="description">
                                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                    with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. York.
                            </div>
                            </div>

                        </div>


                        <div class="card">
                            <div class="image">
                                <img src={one} />
                            </div>

                            <div class="content">
                                <div class="description">
                                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                    with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. York.
                            </div>
                            </div>

                        </div>


                        <div class="card">
                            <div class="image">
                                <img src={two} />
                            </div>

                            <div class="content">
                                <div class="description">
                                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                    with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. York.
                            </div>
                            </div>

                        </div>


                        <div class="card">
                            <div class="image">
                                <img src={three} />
                            </div>

                            <div class="content">
                                <div class="description">
                                    of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                                    with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                            </div>

                        </div>


                    </div>
                </div>

                {/* footer */}

                <footer>
                    <div className="folow-us">
                    <i class="facebook f icon"></i>
                    <i class="twitter  icon"></i>
                    </div>
                    <div>
                        Copyright © Hostels 2020
                    </div>
                </footer>

            </div>

        )
    }
}
