import React, { useState } from "react";
import axios from "axios";
import { ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import cn from "clsx";
import {
    FormGroup,
    Label,
    Input,
    Textarea,
    ErrorText,
} from "@ui/form-elements";
import Button from "@ui/button";

const ContactForm = ({ className, url }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const [serverState, setServerState] = useState({
        submitting: false,
        status: null,
    });
    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg },
        });
        if (ok) {
            form.reset();
        }
    };
    const onSubmit = (data, e) => {
        const form = e.target;
        setServerState({ submitting: true });
        axios({
            method: "post",
            url: url,
            data,
        })
            .then((_res) => {
                handleServerResponse(
                    true,
                    "Merci pour votre message ! Je reviendrai vers vous dans les plus brefs délais.",
                    form
                );
            })
            .catch((err) => {
                handleServerResponse(false, err.response.data.error, form);
            });
    };

    return (
        <div className={cn("contact-form-wrapper", className)}>
            <div className="introduce">
                <form
                    className="rnt-contact-form rwt-dynamic-form row"
                    id="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="col-lg-12">
                        <FormGroup>
                            <Label htmlFor="name">Nom / Prénom</Label>
                            <Input
                                name="name"
                                id="name"
                                type="text"
                                {...register("name", {
                                    required: "Votre nom et prénom est requis",
                                })}
                            />
                            {errors.name && (
                                <ErrorText>{errors.name?.message}</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                {...register("email", {
                                    required: "Votre email est requis",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "adresse email invalide",
                                    },
                                })}
                            />
                            {errors.email && (
                                <ErrorText>{errors.email?.message}</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <FormGroup>
                            <Label htmlFor="subject">Objet</Label>
                            <Input
                                id="subject"
                                name="subject"
                                type="text"
                                {...register("subject", {
                                    required: "L'objet est requis",
                                })}
                            />
                            {errors.subject && (
                                <ErrorText>{errors.subject?.message}</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <FormGroup>
                            <Label htmlFor="message">Votre Message</Label>
                            <Textarea
                                name="message"
                                id="message"
                                {...register("message", {
                                    required: "Un message est requis",
                                })}
                            ></Textarea>
                            {errors.message && (
                                <ErrorText>{errors.message?.message}</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <Button type="submit">
                            <span>Envoyer </span>
                            <ArrowRight />
                        </Button>
                        {serverState.status && (
                            <p
                                className={`mt-4 font-14 ${
                                    !serverState.status.ok
                                        ? "text-red"
                                        : "text-success"
                                }`}
                            >
                                {serverState.status.msg}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

ContactForm.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string,
};

export default ContactForm;
