/* eslint-disable */
import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin"
import { useUpdateCabin } from "./useUpdateCabin"

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";


function CreateCabinForm({ cabinToUpdate = {} }) {
  const { isCreating, createCabin } = useCreateCabin()
  const { isUpdating, updateCabin } = useUpdateCabin()
  const isWorking = isCreating || isUpdating;
  
  const {id: updateId, ...updateValues } = cabinToUpdate
  const isUpdateSession = !!updateId
  const { 
    register,
    handleSubmit,
    reset,
    getValues,
    formState
  } = useForm({
    defaultValues: isUpdateSession ? updateValues : {}
  })
  const { errors } = formState
  
  function onSubmit(data) {
    const image = typeof(data.image) === 'string'
      ? data.image
      : data.image[0]

    if (isUpdateSession) updateCabin({ newCabinData: { ...data, image }, id: updateId}, {
      //onSuccess: (data) => reset()      
      })
    else createCabin({...data, image: image}, {
      onSuccess: (data) => reset()      
      })    
  }

  function onError(errors) {
    //console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name" 
          {...register('name', {
          required: 'This field is required'
        })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input 
          type="number" 
          id="maxCapacity" 
          disabled={isWorking}
          {...register('maxCapacity', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          }
        })}/>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Price should be at least 1'
          }
        })}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
          required: 'This field is required',
          validate: (value) => +getValues()['regularPrice'] >= +value || 'Discount could not be greater than the regular price'
        })}/>
      </FormRow>

      <FormRow label="Description for Website" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
        {...register("image", {
          required: isUpdateSession ? false : "This field is required",
        })}  
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isUpdateSession ? 'Update cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
