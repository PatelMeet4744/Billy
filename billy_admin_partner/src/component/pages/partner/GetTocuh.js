import React from 'react';

const GetTocuh = () => {
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">GetTocuh</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3">
                            <div className="form-group">
                                <label for="exampleInputName1">Subject</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Subject" name="questionName"/>
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>

                            <div className="form-group">
                                <label for="exampleInputName1">Message</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Message" name="questionName"/>
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
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

export default GetTocuh;