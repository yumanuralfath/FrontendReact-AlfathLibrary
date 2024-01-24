import React from 'react';

const FormAddbooks = () => {
  return (
    <div>
      <h1 className='title'>Books</h1>
      <h2 className='subtitle'>Add New Books</h2>
      <div>
        <div className='card is-shadowless'>
          <div className='card-content'>
            <div className='content'>
              <form>
                <div className='field'>
                  <label className='label'>Title Book</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Title Book'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Description</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Description'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Image</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Url Image'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Release Year</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Release Year'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Price</label>
                  <div className='control'>
                    <input type='text' className='input' placeholder='Price' />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Total Page</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Total Page'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Category</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      placeholder='Category ID'
                    />
                  </div>
                </div>

                <div className='field'>
                  <div className='control'>
                    <button className='button is-success'>Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddbooks;
