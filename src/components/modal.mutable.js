import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'; 
import styles from "./styling.module.css"

export default class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {style: this.props.style
                    , title: this.props.title
                    , body: this.props.body
                    , context: $('body')
        };
      }
    
    componentWillMount() {
        if (this.state.style === "keepingOnTopOf"){
            this.setState({style: styles.keepOnTopOfButtons});
        }else{
            this.setState({style: "my-2 mx-2 btn btn-dark float-right"});
        }
    }

    updateModal() {
        var modal = this.state.context.find('#keepOnTopOfModal');
        modal.find('.modal-title').text(this.state.title);
        modal.find('.modal-body').html(this.state.body);
    }

    render() {
        return (
        <>
            <button onClick={this.updateModal.bind(this)} class={this.state.style} type="button" data-toggle="modal" data-target="#keepOnTopOfModal">
            {this.state.title}
            </button>
          
            <div class="modal fade" id="keepOnTopOfModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="modalTitle"></h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                            <div class="modal-body" id="modalBody">
                                <p data-/>
                            </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}