/**
 * Created by prism on 3/24/17.
 */
import React from 'react';
import Helmet from "react-helmet";
import {Link} from 'react-router';
import { browserHistory } from 'react-router';


export default class Main extends React.Component {

    logout(){
        localStorage.clear();
        browserHistory.push('/');
    }

    componentDidMount() {
        (function () {
            /**
             * function for sidebar autohide
             */
            $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
     $("#menu-toggle-2").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled-2");
        $('#menu ul').hide();
    });

     function initMenu() {
      $('#menu ul').hide();
      $('#menu ul').children('.current').parent().show();
      //$('#menu ul:first').show();
      $('#menu li a').click(
        function() {
          var checkElement = $(this).next();
          if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            return false;
            }
          if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('#menu ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
            return false;
            }
          }
        );
      }
    initMenu();
        })();
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Music: Dashboard"
                    link={[
                    {"rel": "shortcut icon", "href": "/static/favicon.ico"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/css/bootstrap.min.css"},
                    {"rel": "stylesheet", "type":"text/css", "href": "/static/css/simple-sidebar.css"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/css/font-awesome.min.css"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/css/sweetalert.css"}
                ]}
                />

                <nav className="navbar navbar-default no-margin">
                    <div className="navbar-header fixed-brand">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"  id="menu-toggle">
                            <span className="glyphicon glyphicon-th-large" aria-hidden="true" />
                        </button>
                        <a className="navbar-brand" href="#">
                            <i className="fa fa-heartbeat fa-4" /> Hiren-Music</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active" ><button className="navbar-toggle collapse in" data-toggle="collapse" id="menu-toggle-2"> <span className="glyphicon glyphicon-th-large" aria-hidden="true" /></button></li>
                        </ul>
                    </div>
                </nav>

                <div id="wrapper">
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav nav-pills nav-stacked" id="menu">
                            <li>
                                <Link to="/music/all" ><span className="fa-stack fa-lg pull-left"><i className="fa fa-music fa-stack-1x " /></span> Collection</Link>
                            </li>
                            <li>
                                <Link to="/music/settings"><span className="fa-stack fa-lg pull-left"><i className="fa fa-wrench fa-stack-1x "/></span> Settings</Link>
                            </li>
                            <li>
                                <Link  to="#"  onClick= { this.logout }> <span className="fa-stack fa-lg pull-left"><i className="fa fa-sign-out fa-stack-1x "/></span> Log Out</Link>
                            </li>
                        </ul>
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row">
                                <div className="col-lg-12">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}