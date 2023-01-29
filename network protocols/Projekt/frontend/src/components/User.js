import {connect} from 'react-redux';
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { deleteComment, getComments, postComment, editComment, deleteUser, LogoutPlayer } from '../actions/MainActions'
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import Cookies from 'universal-cookie'

const User = ({getComments, comments, usernameID, postComment, username, deleteComment, editComment, deleteUser, LogoutPlayer, logged}) => {

    const { id } = useParams()
    const [comment, setComment] = useState('')
    const [editField, setEditField] = useState(false)
    const [editedID, setEditedID] = useState(0)
    const history = useHistory()
    const cookies = new Cookies(); 

    useEffect(() => {
        getComments(id)
    }, [])

    const handlePosting = () => {
        postComment({
            postedbyuserid: usernameID,
            postedbyusername: username,
            comment
        }, id)
        setComment('')
        window.location.reload()
    }

    const handleDeletingUser = () => {
        if (window.confirm("Are you sure you want to delete user?") === true){
            LogoutPlayer(); 
            cookies.set('logged', false); 
            cookies.remove('username')
            deleteUser(id)
            history.push("/")
        }
    }
    
    const handleDelete = (id) => {
        deleteComment(id);
        window.location.reload()
    }

    const handleEditing = () => {
        editComment({comment}, editedID)
        setEditField(false)
        setEditedID(0)
        setComment('')
        window.location.reload()
    }

    return (
        <div>
            <h2>User component</h2>
            <h4>Comments</h4>
            {comments.map(comment =>(
                <div key={comment.id}>
                <Card>
                <Card.Header>{comment.postedbyusername}</Card.Header>
                <Card.Body>
                  <Card.Text>
                    {comment.comment}
                  </Card.Text>
                  {(comment.postedbyuserid === usernameID) ? 
                  <div>
                    <Button variant="primary" onClick={() => handleDelete(comment.id)}>Delete comment</Button>
                    <Button variant="primary" onClick={() => {setEditField(true); setEditedID(comment.id); setComment(comment.comment)}}>Edit comment</Button>
                  </div>
                   : null}
                </Card.Body>
              </Card>
              </div>
            ))}
            {
                logged ? 
                <div>
                {editField ?
                    <div className="m-3">
                    <h4>Edit your comment</h4>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="edit-comment"
                            placeholder="Insert edited comment"
                            aria-label="Insert edited comment"
                            aria-describedby="basic-addon2"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                    <Button variant="primary" size="lg" onClick={() => handleEditing()}>Edit comment</Button>
                    </InputGroup>
                    </div>
                    : 
                    <div className="m-3">
                    <h4>Post your comment</h4>
                            <InputGroup className="mb-3">
                                <FormControl
                                    id="post-comment"
                                    placeholder="Insert comment"
                                    aria-label="Insert comment"
                                    aria-describedby="basic-addon2"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                />
                            <Button variant="primary" size="lg" onClick={() => handlePosting()}>Post comment</Button>
                            </InputGroup>
                        </div>
                    }
                    </div>
                    : null
            }
                {(parseInt(id) === usernameID) ? 
                  <div>
                    <Button variant="primary" onClick={() => handleDeletingUser()}>Delete your account</Button>
                  </div>
                   : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        comments: state.roomnames.comments,
        usernameID: state.roomnames.usernameID,
        username: state.roomnames.username,
        logged: state.roomnames.logged
    }
}

const mapDispatchToProps = {
    getComments,
    deleteComment,
    postComment,
    editComment,
    deleteUser,
    LogoutPlayer
}


export default connect(mapStateToProps, mapDispatchToProps)(User)