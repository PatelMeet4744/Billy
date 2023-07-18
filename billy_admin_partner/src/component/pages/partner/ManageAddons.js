import React from 'react';

const ManageAddons = () => {
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Addons</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3">
                            <div className="form-group">
                                <label for="exampleInputName1">Addons Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Addons Name" value={""} name="questionName"/>
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Addons Type</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Addons Type" value={""} name="questionName"/>
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Addons Price</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Addons Price" value={""} name="questionName"/>
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Addons Additional Price</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Addons Additional Price" value={""} name="questionName"/>
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Addons Final Price</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Addons Final Price" value={""} name="questionName"/>
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

export default ManageAddons;