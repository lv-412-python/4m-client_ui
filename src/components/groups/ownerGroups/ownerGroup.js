import React from 'react';

const OwnerGroup = props =>(
    <div>
         {/* eslint-disable-next-line react/prop-types */}
        <form onSubmit={props.getGroups}>
            <label>Owner id:
                    <input type="number" min="1" name="owner"/>
            </label>
            <div>
                <button>Get Groups</button>
            </div>
        </form>
    </div>
);

export default OwnerGroup;
