import React, {Component} from 'react';


class DeleteModal extends Component{
    render(){
        
        const {isModalOpen, closeModal, deleteTeam, teamName}=this.props
        if(isModalOpen){
            return (
                <div className="delete-modal">
                    <div className="modal-content">
                        
                        <div className="confirm-text center row">
                            <div className="col s10 offset-s1">Are you sure you want to remove {teamName} from your list?</div>
                        </div>
                        <div className="confirm-row center row">
                            <div className="col s10 offset-s1">
                                <button onClick={() => {deleteTeam()}} className="btn confirm-btn green lighten-1">YES</button>
                                <button onClick={() => {closeModal()}} className="btn deny-btn red lighten-1">NO</button>
                            </div>
                        </div>
                                
                    </div>
                </div>
            )
        }
        return null;
    }
}

export default DeleteModal;