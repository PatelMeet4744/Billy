import React from 'react';

const Item = () => {
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Item</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3">
                            <div className="form-group">
                                <label for="exampleInputName1">Item Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Item Name" name="questionName" />
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>

                            <div class="form-group">
                                <label for="exampleSelectGender">Item Type</label>
                                <select class="form-control" id="exampleSelectGender">
                                    <option>veg</option>
                                    <option>Non-veg</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Item Description</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Item Description" name="questionName" />
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>

                            <div className="file-card">
                                <div className="file-inputs">
                                    {/* <input type="file" /> */}
                                    <input className="InputField form-control form-control-lg" type="file" placeholder="gstCertificate" name="gstCertificate" />
                                    <button className="dfds">

                                        <i className="mdi mdi-plus menu-icon" />
                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                        Upload
                                    </button>
                                </div>
                            </div>

                            <br /><br />
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" style={{backgroundColor:'lightgray'}} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Add Extra
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div className="form-group">
                                                <label for="exampleInputName1">Title</label>
                                                <input type="text" className="form-control form-control-lg" placeholder="title" name="questionName" />
                                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleSelectGender">Customer Selection</label>
                                                <select class="form-control" id="exampleSelectGender">
                                                    <option>optional</option>
                                                    <option>compulsory</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleSelectGender">Add Extra</label>
                                                <select class="form-control" id="exampleSelectGender">
                                                    <option>Tomato</option>
                                                    <option>Olipano</option>
                                                    <option>Red Chili</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <br/><br/>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingTwo">
                                        <button class="accordion-button collapsed" style={{backgroundColor:'lightgray'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Addons
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                        <div className="form-group">
                                                <label for="exampleInputName1">Title</label>
                                                <input type="text" className="form-control form-control-lg" placeholder="title" name="questionName" />
                                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleSelectGender">Customer Selection</label>
                                                <select class="form-control" id="exampleSelectGender">
                                                    <option>optional</option>
                                                    <option>compulsory</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleSelectGender">Add Extra</label>
                                                <select class="form-control" id="exampleSelectGender">
                                                    <option>Cheess</option>
                                                    <option>panner</option>
                                                    <option>Red Chili</option>
                                                </select>
                                            </div></div>
                                    </div>
                                </div>
                                <br/><br/>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingThree">
                                        <button class="accordion-button collapsed" style={{backgroundColor:'lightgray'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Variant
                                        </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                        <div className="form-group">
                                                <label for="exampleInputName1">Variant Name</label>
                                                <input type="text" className="form-control form-control-lg" placeholder="Variant Name" name="questionName" />
                                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputName1">Variant Uom</label>
                                                <input type="text" className="form-control form-control-lg" placeholder="Variant Uom" name="questionName" />
                                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputName1">Variant Price</label>
                                                <input type="text" className="form-control form-control-lg" placeholder="Variant Price" name="questionName" />
                                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputName1">Variant Sales Price</label>
                                                <input type="text" className="form-control form-control-lg" placeholder="Variant Sales Price" name="questionName" />
                                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>

                                <br/><br/>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingThree">
                                        <button class="accordion-button collapsed" style={{backgroundColor:'lightgray'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Category
                                        </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                        <div class="form-group">
                                                <label for="exampleSelectGender">Customer Selection</label>
                                                <select class="form-control" id="exampleSelectGender">
                                                    <option>Small</option>
                                                    <option>Medium</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                                <button type="submit" style={{ height: '40px' }} class="btn btn-primary mr-2" name="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;