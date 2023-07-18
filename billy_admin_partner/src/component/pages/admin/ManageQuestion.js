import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NEW_QUESTION_RESET,UPDATE_QUESTION_RESET } from "../../../constants/questionConstants"
import { clearErrors, createQuestion, getsinglequestion, updatequestion} from "../../../actions/questionAction"
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

const ManageQuestion = ({ history }) => {

    const [question, setQuestion] = useState({
        questionName: ""
    });
    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newquestion, loading, error, success } = useSelector((state) => state.newquestion);
    const { singlequestion } = useSelector((state) => state.singlequestion);
    const { isUpdated } = useSelector((state) => state.updatequestion);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };

        if (id) {
            dispatch(getsinglequestion(params.id))
            setQuestion({ ...question, questionName: singlequestion.questionName });
        };

        if(isUpdated){
            swal({
                title: "Question",
                text: "The Question Update",
                icon: "info"
              });
            navigate('/admin/question');
            dispatch({type: UPDATE_QUESTION_RESET});
        };
       
        if (success) {
            swal({
                title: "Question",
                text: "The Question Created Successfully",
                icon: "info"
              });
          navigate('/admin/question')
          dispatch({ type: NEW_QUESTION_RESET });
        };
      }, [dispatch, alert, error, history, success,isUpdated,id]);

    const handleChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.questionName) {
            setError(true);
            return false;
        }
        const formData = new FormData();
        formData.append('questionName', question.questionName);
        if(params.id){
            dispatch(updatequestion(params.id,formData));
            // swal({
            //     title: "Question",
            //     text: "The Question Update",
            //     icon: "info"
            //   });
            // navigate('/admin/question');
            // dispatch({type: UPDATE_QUESTION_RESET});
        }else{
            dispatch(createQuestion(formData));
        }
        
    }
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Question</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Name" name="questionName" value={question.questionName} onChange={(e) => handleChange(e)} />
                                {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>}
                            </div>
                            <div className="mt-3">
                                {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                                <button type="submit" style={{height:'40px'}} class="btn btn-primary mr-2" name="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageQuestion;