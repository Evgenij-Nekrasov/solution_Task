import React, { Component } from "react";

interface Param {
   id: number;
   name: string;
   type: "string";
}

interface ParamValue {
   paramId: number;
   value: string;
}

interface Model {
   paramValues: ParamValue[];
}

interface Props {
   params: Param[];
   model: Model;
   onModelChange: (updatedModel: Model) => void;
}

interface State {
   editedModel: Model;
}

class ParamEditor extends Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = {
         editedModel: { ...props.model },
      };
   }

   handleParamChange = (paramId: number, value: string) => {
      const { editedModel } = this.state;
      const updatedParamValues = editedModel.paramValues.map((paramValue) => {
         if (paramValue.paramId === paramId) {
            return { ...paramValue, value };
         }
         return paramValue;
      });
      const updatedModel: Model = {
         ...editedModel,
         paramValues: updatedParamValues,
      };
      this.setState({ editedModel: updatedModel });
      this.props.onModelChange(updatedModel);
   };

   getModel = () => {
      return this.state.editedModel;
   };

   render() {
      const { params } = this.props;
      const { editedModel } = this.state;

      return (
         <div>
            {params.map((param) => (
               <div key={param.id}>
                  <label>{param.name}:</label>
                  <input
                     type="text"
                     value={
                        editedModel.paramValues.find(
                           (paramValue) => paramValue.paramId === param.id
                        )?.value || ""
                     }
                     onChange={(e) =>
                        this.handleParamChange(param.id, e.target.value)
                     }
                  />
               </div>
            ))}
         </div>
      );
   }
}

export default ParamEditor;
