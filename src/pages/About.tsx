import React from 'react'
import {StyledH2} from "../components/styledComponents/StyledH2";
import Container from "@material-ui/core/Container";
import {StyledP} from "../components/styledComponents/StyledP";
import {useForm} from "react-hook-form";
import {StyledText} from "../components/styledComponents/StyledText";
import {StyledForm} from "../components/styledComponents/StyledForm";
import {StyledH3} from "../components/styledComponents/StyledH3";
import {StyledTextarea} from "../components/styledComponents/StyledTextarea";
import {StyledSubmit} from "../components/styledComponents/StyledSubmit";

export const About: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: {errors, isDirty},
        trigger
    } = useForm({
        mode: "onSubmit",
        reValidateMode: 'onChange'
    });

    const onSubmit = (data:any) => {
        console.log('sended:', data)
    }

    React.useEffect(()=> {
        console.log("trigger",trigger)
        console.log("register",register)
        console.log("errors",errors)
        console.log("errors.length", errors.length)
    },[])

    return (
        <Container maxWidth="md">
            <StyledH2>
                About
            </StyledH2>
            <StyledP>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae culpa esse iste iure nam nostrum saepe sint ullam? Deserunt dignissimos ducimus iste molestias non!
                Adipisci culpa cupiditate distinctio dolorem, dolorum esse exercitationem laboriosam mollitia necessitatibus perspiciatis placeat possimus quaerat sequi ullam
                voluptate? Cumque dolorum earum eligendi error harum mollitia temporibus veniam. Architecto asperiores atque blanditiis consequuntur corporis culpa cupiditate
                dignissimos dolore doloribus expedita facere fuga fugiat fugit harum id impedit, incidunt itaque libero magnam magni molestiae mollitia nulla numquam obcaecati
                odio provident quae quas qui quia, quisquam quod recusandae rem sed similique soluta ut voluptatum? Molestiae neque sequi temporibus totam!         </StyledP>
            <div>
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <StyledH3>Contact us</StyledH3>

                    <StyledText color={'black'} fontSize={'16px'} type='text' placeholder='subject'
                                     {...register('subject', {required: true, maxLength: 15})} />
                    {errors.subject && <i><b>Field subject is required field no more than 15 symbols</b></i>}

                    <StyledText color={'black'} fontSize={'16px'} type='text' placeholder='Age' {...register('age', {required: true, pattern: /\d?\d/, min: 18, max: 99})} />
                    {errors.age && <i><b>Field age is required field, min value = 18 and max = 99</b></i>}

                    <StyledTextarea color={'black'} fontSize={'16px'} placeholder='Message' {...register('message', {required: true})}  />
                    {errors.message && <i><b>Field message is required field</b></i>}

                    <StyledSubmit type="submit" disabled={!isDirty || Object.keys(errors).length > 0}>submit</StyledSubmit>
                </StyledForm>
            </div>
        </Container>
    )
}