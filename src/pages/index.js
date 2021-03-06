import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import {
  updatePage,
  loadPageData,
  updateSubscriberForm,
  createSubscriber,
  createApplicant,
} from "../redux/actions";

import Button from "@material-ui/core/Button";

import Layout from "../layouts/default.js";
import Paragraph from "../components/editables/Paragraph";
import Image from "../components/editables/Image";
import PlainText from "../components/editables/PlainText";
import CustomLink from "../components/editables/CustomLink";
import CustomButton from "../components/editables/CustomButton";
import BackgroundImage from "../components/editables/BackgroundImage";

import Partner from "../components/home/Partner";
import OriginatorCard from "../components/home/OriginatorCard";

import endevaLogo from "../assets/images/endeva.png";
import ibanLogo from "../assets/images/iban.png";
import intellecapLogo from "../assets/images/intellecap.png";


import { PARTNER_REGION_OPTIONS, ORIGINATOR_OPTIONS } from "../utils/constants";

const PAGE_ID = "home";

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
    createSubscriber: data => {
      dispatch(createSubscriber(data));
    },
    updateSubscriberForm: data => {
      dispatch(updateSubscriberForm(data));
    },
    createApplicant: data => {
      dispatch(createApplicant(data));
    }
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
    subscriberForm: state.subscribers.form,
  };
};

class HomePage extends React.Component {
  componentDidMount() {
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  saveHandler = id => content => {
    this.props.onUpdatePageData(PAGE_ID, id, content);
  };

  addPartner = () => {
    const partnerArray = [...this.props.pageData.content.partners];
    const newPartner = {
      logo: {
        imageSrc: "/images/favicon.png"
      },
      name: {
        text: "Partner name"
      },
      description: {
        text: "Partner description"
      }
    };

    partnerArray.push(newPartner);
    this.props.onUpdatePageData(PAGE_ID, "partners", partnerArray);
  };

  editPartner = (index, field) => content => {
    const arr = [...this.props.pageData.content.partners];
    const updated = {
      ...arr[index],
      [field]: content
    };

    arr[index] = updated;

    this.props.onUpdatePageData(PAGE_ID, "partners", arr);
  };

  deletePartner = i => () => {
    const arr = [...this.props.pageData.content.partners];
    arr.splice(i, 1);
    this.props.onUpdatePageData(PAGE_ID, "partners", arr);
  };

  submitForm = event => {
    event.preventDefault();
    const formData = this.props.subscriberForm;
    console.log(formData)
    this.props.createApplicant(formData);
  };

  updateForm = field => event => {
    this.props.updateSubscriberForm({ [field]: event.target.value });
  };

  updateFormCheckbox = field => event => {
    this.props.updateSubscriberForm({ [field]: event.target.checked });
  };

  updateFormMultiSelect = field => event => {
    const arr = []
    for (var i = 0, l = event.target.options.length; i < l; i++) {
      if (event.target.options[i].selected) {
        arr.push(event.target.options[i].value);
      }
    }
    this.props.updateSubscriberForm({ [field]: arr })
  }

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};
    const originators = this.props.data ? this.props.data.allOriginators.edges : [];
    // const originators = []
    const partners = content["partners"] || [];
    const subscriber = this.props.subscriberForm;

    return (
      <Layout>
        <main className="page">
          <BackgroundImage
            content={content["header-bg"]}
            onSave={this.saveHandler("header-bg")}
            className="home-section bg-dark-alfa-50 parallax-2 fixed-height-small"
            id="home"
          >
            <div className="js-height-parent container">
              <div className="home-content container">
                <div className="home-text">
                  <h1 className="hs-line-2 mt-0 mb-40 mb-xs-20">
                    <PlainText
                      content={content["landing-title"]}
                      onSave={this.saveHandler("landing-title")}
                    />
                  </h1>

                  <h2 className="hs-line-11 mb-20 mb-xs-10">
                    <PlainText
                      content={content["landing-subtitle"]}
                      onSave={this.saveHandler("landing-subtitle")}
                    />
                  </h2>

                  <h3 className="hs-line-4 mb-20 mb-xs-10">
                    <strong>
                      <PlainText
                        content={content["landing-date-location"]}
                        onSave={this.saveHandler("landing-date-location")}
                      />
                    </strong>
                  </h3>

                  <div className="local-scroll">
                    <CustomButton
                      content={content["landing-button-1"]}
                      onSave={this.saveHandler("landing-button-1")}
                      className="btn btn-mod btn-large btn-w hidden-xs"
                    />
                    <span className="hidden-xs">&nbsp;</span>
                    <CustomButton
                      content={content["landing-button-2"]}
                      onSave={this.saveHandler("landing-button-2")}
                      className="btn btn-mod btn-large btn-color"
                    />
                  </div>
                  <div className="header-logos mt-80">
                    <img src={endevaLogo} alt="Endeva" className="logos" />
                    <img src={ibanLogo} alt="IBAN" className="logos" />
                    <img src={intellecapLogo} alt="Intellecap" className="logos" />
                  </div>
                </div>
              </div>
            </div>
          </BackgroundImage>

          <section className="split-section bg-gray" id="overview">
            <div className="clearfix relative">
              <div className="split-section-headings left">
                <div className="ssh-table">
                  <div
                    className="ssh-cell page-section bg-scroll intro-section"
                    data-background="adopters2.jpg"
                  />
                </div>
              </div>

              <div className="split-section-content right small-section bg-gray-lighter">
                <div className="split-section-wrapper">
                  <h1 className="section-title">
                    <PlainText
                      content={content["overview-title"]}
                      onSave={this.saveHandler("overview-title")}
                    />
                  </h1>

                  <h2 className="section-heading uppercase strong">
                    <PlainText
                      content={content["overview-subtitle"]}
                      onSave={this.saveHandler("overview-subtitle")}
                    />
                  </h2>

                  <div className="section-text mb-60">
                    <Paragraph
                      content={content["overview-description"]}
                      onSave={this.saveHandler("overview-description")}
                    />
                  </div>

                  <div className="row alt-features-grid">
                    <div
                      className="col-sm-4 wow fadeInRight"
                      data-wow-delay="0.1s"
                    >
                      <div className="alt-features-item align-center">
                        <div className="alt-features-icon color">
                          <span className="icon-lightbulb" />
                        </div>
                        <h3 className="alt-features-title">
                          <CustomLink
                            content={content["originators-link-1"]}
                            onSave={this.saveHandler("originators-link-1")}
                          />
                        </h3>
                      </div>
                    </div>

                    <div
                      className="col-sm-4 wow fadeInRight"
                      data-wow-delay="0.2s"
                    >
                      <div className="alt-features-item align-center">
                        <div className="alt-features-icon color">
                          <span className="icon-genius" />
                        </div>
                        <h3 className="alt-features-title">
                          <CustomLink
                            content={content["originators-link-2"]}
                            onSave={this.saveHandler("originators-link-2")}
                          />
                        </h3>
                      </div>
                    </div>

                    <div
                      className="col-sm-4 wow fadeInRight"
                      data-wow-delay="0.3s"
                    >
                      <div className="alt-features-item align-center">
                        <div className="alt-features-icon color">
                          <span className="icon-calendar" />
                        </div>
                        <h3 className="alt-features-title">
                          <CustomLink
                            content={content["originators-link-3"]}
                            onSave={this.saveHandler("originators-link-3")}
                          />
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="page-section" id="originators">
            <div className="container relative">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 align-center">
                  <h1 className="section-title mb-10">
                    <PlainText
                      content={content["originators-title"]}
                      onSave={this.saveHandler("originators-title")}
                    />
                  </h1>
                  <h2 className="section-heading">
                    <PlainText
                      content={content["originators-subtitle"]}
                      onSave={this.saveHandler("originators-subtitle")}
                    />
                  </h2>

                  <div className="section-line mb-50 mb-xs-30" />

                  <div className="section-text mb-80 mb-xs-50">
                    <Paragraph
                      content={content["originators-description"]}
                      onSave={this.saveHandler("originators-description")}
                    />
                  </div>
                </div>
              </div>

              <div className="row multi-columns-row">
                {
                  originators.map((originator, i) => {
                    return(
                      <OriginatorCard key={`originator-${i}`} originator={originator} />
                    )
                  })
                }
              </div>
            </div>
          </section>

          <BackgroundImage
            content={content["adopters-bg"]}
            onSave={this.saveHandler("adopters-bg")}
            className="page-section bg-dark-alfa-90 bg-scroll call-to-action"
            id="call-to-action"
          >
            <div className="container relative">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 align-center">
                  <h1 className="section-title large">
                    <PlainText
                      content={content["adopters-title"]}
                      onSave={this.saveHandler("adopters-title")}
                    />
                  </h1>

                  <h2 className="section-heading uppercase strong">
                    <PlainText
                      content={content["adopters-subtitle"]}
                      onSave={this.saveHandler("adopters-subtitle")}
                    />
                  </h2>

                  <div className="section-text white mb-50 mb-xs-30">
                    <Paragraph
                      content={content["adopters-description"]}
                      onSave={this.saveHandler("adopters-description")}
                    />
                  </div>

                  <div className="local-scroll">
                    <CustomButton
                      content={content["adopters-button-1"]}
                      onSave={this.saveHandler("adopters-button-1")}
                      className="btn btn-mod btn-w btn-large"
                    />
                    <span className="hidden-xs">&nbsp;</span>
                    <CustomButton
                      content={content["adopters-button-2"]}
                      onSave={this.saveHandler("adopters-button-2")}
                      className="btn btn-mod btn-large btn-color"
                    />
                  </div>
                </div>
              </div>
            </div>
          </BackgroundImage>

          <section className="page-section" id="partners">
            <div className="container relative">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 align-center">
                  <h1 className="section-title mb-10">
                    <PlainText
                      content={content["partners-title"]}
                      onSave={this.saveHandler("partners-title")}
                    />
                  </h1>

                  <h2 className="section-heading">
                    <PlainText
                      content={content["partners-subtitle"]}
                      onSave={this.saveHandler("partners-subtitle")}
                    />
                  </h2>

                  <div className="section-line mb-50 mb-xs-30" />

                  <div className="section-text mb-80 mb-xs-50">
                    <Paragraph
                      content={content["partners-description"]}
                      onSave={this.saveHandler("partners-description")}
                    />
                  </div>
                </div>
              </div>

              <div className="row multi-columns-row service-grid">
                {partners.map((entity, i) => (
                  <Partner
                    key={`partner-${i}`}
                    index={i}
                    partner={entity}
                    onDelete={
                      this.props.isEditingPage ? this.deletePartner : null
                    }
                    onSave={this.editPartner}
                  />
                ))}

                <div className="col-sm-12">
                  {this.props.isEditingPage && (
                    <Button onClick={this.addPartner}>Add partner</Button>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="page-section" id="news">
            <div className="container relative">
              <div className="align-left">
                <h1 className="section-title mb-10">
                  <PlainText
                    content={content["news-title"]}
                    onSave={this.saveHandler("news-title")}
                  />
                </h1>
                <h2 className="section-heading">
                  <PlainText
                    content={content["news-subtitle"]}
                    onSave={this.saveHandler("news-subtitle")}
                  />
                </h2>

                <div className="clearfix">
                  <div className="section-line left mt-0 mb-80 mb-xs-40" />
                </div>
              </div>

              <div className="row multi-columns-row">
                <div
                  className="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn"
                  data-wow-delay="0.1s"
                  data-wow-duration="2s"
                >
                  <div className="post-prev-img post-prev-border">
                    <Image
                      content={content["news-item-1-image"]}
                      onSave={this.saveHandler("news-item-1-image")}
                    />
                  </div>

                  <div className="post-prev-title">
                    <CustomLink
                      content={content["news-item-1-title"]}
                      onSave={this.saveHandler("news-item-1-title")}
                    />
                  </div>

                  <div className="post-prev-info">
                    <Paragraph
                      content={content["news-item-1-author"]}
                      onSave={this.saveHandler("news-item-1-author")}
                    />
                  </div>

                  <div className="post-prev-text">
                    <Paragraph
                      content={content["news-item-1-description"]}
                      onSave={this.saveHandler("news-item-1-description")}
                    />
                  </div>

                  <div className="post-prev-more">
                    <CustomButton
                      content={content["news-item-1-link"]}
                      onSave={this.saveHandler("news-item-1-link")}
                      className="btn btn-mod btn-color"
                    />
                  </div>
                </div>

                <div
                  className="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn"
                  data-wow-delay="0.1s"
                  data-wow-duration="2s"
                >
                  <div className="post-prev-img post-prev-border">
                    <Image
                      content={content["news-item-2-image"]}
                      onSave={this.saveHandler("news-item-2-image")}
                    />
                  </div>

                  <div className="post-prev-title">
                    <CustomLink
                      content={content["news-item-2-title"]}
                      onSave={this.saveHandler("news-item-2-title")}
                    />
                  </div>

                  <div className="post-prev-info">
                    <Paragraph
                      content={content["news-item-2-author"]}
                      onSave={this.saveHandler("news-item-2-author")}
                    />
                  </div>

                  <div className="post-prev-text">
                    <Paragraph
                      content={content["news-item-2-description"]}
                      onSave={this.saveHandler("news-item-2-description")}
                    />
                  </div>

                  <div className="post-prev-more">
                    <CustomButton
                      content={content["news-item-2-link"]}
                      onSave={this.saveHandler("news-item-2-link")}
                      className="btn btn-mod btn-color"
                    />
                  </div>
                </div>

                <div
                  className="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn"
                  data-wow-delay="0.1s"
                  data-wow-duration="2s"
                >
                  <div className="post-prev-img post-prev-border">
                    <Image
                      content={content["news-item-3-image"]}
                      onSave={this.saveHandler("news-item-3-image")}
                    />
                  </div>

                  <div className="post-prev-title">
                    <CustomLink
                      content={content["news-item-3-title"]}
                      onSave={this.saveHandler("news-item-3-title")}
                    />
                  </div>

                  <div className="post-prev-info">
                    <Paragraph
                      content={content["news-item-3-author"]}
                      onSave={this.saveHandler("news-item-3-author")}
                    />
                  </div>

                  <div className="post-prev-text">
                    <Paragraph
                      content={content["news-item-3-description"]}
                      onSave={this.saveHandler("news-item-3-description")}
                    />
                  </div>

                  <div className="post-prev-more">
                    <CustomButton
                      content={content["news-item-3-link"]}
                      onSave={this.saveHandler("news-item-3-link")}
                      className="btn btn-mod btn-color"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <BackgroundImage
            content={content["contact-bg"]}
            onSave={this.saveHandler("contact-bg")}
            className="small-section bg-color-alfa-90 bg-scroll call-to-action"
            id="contact-us"
          >
            <div className="container relative">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 align-center">
                  <h1 className="section-title large">
                    <PlainText
                      content={content["contact-title"]}
                      onSave={this.saveHandler("contact-title")}
                    />
                  </h1>

                  <h2 className="section-heading uppercase strong">
                    <PlainText
                      content={content["contact-subtitle"]}
                      onSave={this.saveHandler("contact-subtitle")}
                    />
                  </h2>

                  <div className="local-scroll">
                    <CustomButton
                      content={content["contact-button-1"]}
                      onSave={this.saveHandler("contact-button-1")}
                      className="btn btn-mod btn-border-w btn-large"
                    />
                    <span className="hidden-xs">&nbsp;</span>
                    <CustomButton
                      content={content["contact-button-2"]}
                      onSave={this.saveHandler("contact-button-2")}
                      className="btn btn-mod btn-border-w btn-large"
                    />
                  </div>
                </div>
              </div>
            </div>
          </BackgroundImage>

          <section className="page-section" id="contact">
            <div className="container relative">
              <div className="row mb-80 mb-xs-50">
                <div className="col-md-8 col-md-offset-2 align-center">
                  <h1 className="section-title mb-10">
                    <PlainText
                      content={content["event-info-title"]}
                      onSave={this.saveHandler("event-info-title")}
                    />
                  </h1>
                  <h2 className="section-heading">
                    <PlainText
                      content={content["event-info-subtitle"]}
                      onSave={this.saveHandler("event-info-subtitle")}
                    />
                  </h2>

                  <div className="section-line mb-50 mb-xs-30" />

                  <div className="section-text">
                    <Paragraph
                      content={content["event-info-description"]}
                      onSave={this.saveHandler("event-info-description")}
                    />
                  </div>
                </div>
              </div>

              <div className="row multi-columns-row alt-features-grid-1">
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <div className="alt-features-item-1 align-center">
                    <div className="alt-features-icon-1">
                      <i className="fa fa-calendar-o" />
                    </div>
                    <h3 className="alt-features-title-1">
                      <PlainText
                        content={content["event-info-cta1-title"]}
                        onSave={this.saveHandler("event-info-cta1-title")}
                      />
                    </h3>
                    <div className="alt-features-descr-1 email-link">
                      <CustomLink
                        content={content["event-info-cta1-link"]}
                        onSave={this.saveHandler("event-info-cta1-link")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4 col-lg-4">
                  <div className="alt-features-item-1 align-center">
                    <div className="alt-features-icon-1">
                      <i className="fa fa-file-pdf-o" />
                    </div>
                    <h3 className="alt-features-title-1">
                      <PlainText
                        content={content["event-info-cta2-title"]}
                        onSave={this.saveHandler("event-info-cta2-title")}
                      />
                    </h3>
                    <div className="alt-features-descr-1 email-link">
                      <CustomLink
                        content={content["event-info-cta2-link"]}
                        onSave={this.saveHandler("event-info-cta2-link")}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4 col-lg-4">
                  <div className="alt-features-item-1 align-center">
                    <div className="alt-features-icon-1">
                      <i className="fa fa-envelope" />
                    </div>
                    <h3 className="alt-features-title-1">
                      <PlainText
                        content={content["event-info-cta3-title"]}
                        onSave={this.saveHandler("event-info-cta3-title")}
                      />
                    </h3>
                    <div className="alt-features-descr-1 email-link">
                      <CustomLink
                        content={content["event-info-cta3-link"]}
                        onSave={this.saveHandler("event-info-cta3-link")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="page-section" id="apply">
            <div className="container relative">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 align-center">
                  <h1 className="section-title large">
                    <PlainText
                      content={content["apply-title"]}
                      onSave={this.saveHandler("apply-title")}
                    />
                  </h1>
                  <h2 className="section-heading mb-40">
                    <PlainText
                      content={content["apply-subtitle"]}
                      onSave={this.saveHandler("apply-subtitle")}
                    />
                  </h2>
                  <div className="section-text">
                    <Paragraph
                      content={content["apply-description"]}
                      onSave={this.saveHandler("apply-description")}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-10 col-md-offset-1 application-form">
                  <form
                    acceptCharset="UTF-8"
                    className="form contact-form"
                    id="contact_form"
                    autoComplete="off"
                    data-toggle="validator"
                    onSubmit={this.submitForm}
                  >
                    <div className="clearfix">
                      <div className="cf-left-col">
                        <div className="form-group">
                          <label className="form-label" htmlFor="first-name">
                            First name
                          </label>
                          <input
                            type="text"
                            name="subscriber[firstname]"
                            id="first-name"
                            className="input-lg form-control"
                            pattern=".{3,100}"
                            required
                            data-error="Please enter your name."
                            value={subscriber["firstname"]}
                            onChange={this.updateForm("firstname")}
                          />
                          <div className="help-block with-errors" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="last-name">
                            Last name
                          </label>
                          <input
                            type="text"
                            name="subscriber[lastname]"
                            id="last-name"
                            className="input-lg form-control"
                            pattern=".{3,100}"
                            required
                            data-error="Please enter your last name."
                            value={subscriber["lastname"]}
                            onChange={this.updateForm("lastname")}
                          />
                          <div className="help-block with-errors" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="company">
                            Organization name
                          </label>
                          <input
                            type="text"
                            name="subscriber[company]"
                            id="company"
                            className="input-lg form-control"
                            pattern=".{5,100}"
                            value={subscriber["company"]}
                            onChange={this.updateForm("company")}
                          />
                          <div className="help-block with-errors" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="website">
                            Website
                          </label>
                          <input
                            type="text"
                            name="subscriber[website]"
                            id="website"
                            className="input-lg form-control"
                            pattern=".{5,100}"
                            value={subscriber["website"]}
                            onChange={this.updateForm("website")}
                          />
                          <div className="help-block with-errors" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="position">
                            Job title
                          </label>
                          <input
                            type="text"
                            name="subscriber[position]"
                            id="position"
                            className="input-lg form-control"
                            pattern=".{5,100}"
                            value={subscriber["position"]}
                            onChange={this.updateForm("position")}
                          />
                          <div className="help-block with-errors" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                          <input
                            type="email"
                            name="subscriber[email]"
                            id="email"
                            className="input-lg form-control"
                            pattern=".{5,100}"
                            required
                            data-error="Please enter a valid email address."
                            value={subscriber["email"]}
                            onChange={this.updateForm("email")}
                          />
                          <div className="help-block with-errors" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="phone">
                            Phone number
                          </label>
                          <input
                            type="tel"
                            name="subscriber[phone]"
                            id="phone"
                            className="input-lg form-control"
                            pattern=".{5,100}"
                            data-error="Please enter a valid phone number."
                            value={subscriber["phone"]}
                            onChange={this.updateForm("phone")}
                          />
                          <div className="help-block with-errors" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="whatsapp">
                            <input
                              type="checkbox"
                              name="subscriber[whatsapp]"
                              id="whatsapp"
                              style={{ marginRight: '8px' }}
                              pattern=".{5,100}"
                              value={subscriber["whatsapp"]}
                              onChange={this.updateFormCheckbox("whatsapp")}
                            />
                            You can contact me on Whatsapp
                          </label>
                          <div className="help-block with-errors" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="referrer">
                            How did you find out about this event?
                          </label>
                          <input
                            type="text"
                            name="subscriber[referrer]"
                            id="referrer"
                            className="input-lg form-control"
                            pattern=".{5,100}"
                            required
                            data-error="This field is required."
                            value={subscriber["referrer"]}
                            onChange={this.updateForm("referrer")}
                          />
                          <div className="help-block with-errors" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="location">
                            Where are you currently based?
                          </label>
                          <input
                            type="text"
                            name="subscriber[location]"
                            id="location"
                            className="input-lg form-control"
                            pattern=".{5,100}"
                            value={subscriber["location"]}
                            onChange={this.updateForm("location")}
                          />
                          <div className="help-block with-errors" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="role">
                            Are you applying as an Adopter or an Ecosystem Partner?
                          </label>
                          <select
                            name="subscriber[role]"
                            id="role"
                            className="input-lg form-control"
                            placeholder="Which role interests you?"
                            pattern=".{5,100}"
                            required
                            data-error="Please select an item from the list."
                            value={subscriber["role"]}
                            onChange={this.updateForm("role")}
                          >
                            <option value="Adopter">
                              Adopter: You are interested in adopting or
                              replicating a social business model.
                            </option>
                            <option value="Partner">
                              Ecosystem Partner: You wish to provide support for the
                              replication of social business models.
                            </option>
                          </select>
                          <div className="help-block with-errors" />
                        </div>

                      </div>

                      { this.props.subscriberForm.role ==="Adopter" &&

                        <div className="cf-right-col">

                          <div className="form-group">
                            <label className="form-label" htmlFor="bmodel">
                              Which model are you interested in?
                            </label>
                            <select
                              name="subscriber[bmodel]"
                              id="bmodel"
                              className="input-lg form-control"
                              pattern=".{5,100}"
                              data-error="Please select an item from the list."
                              value={subscriber["bmodel"]}
                              onChange={this.updateForm("bmodel")}
                              required
                            >
                              <option value={"Choose one"} disabled="disabled">
                                Choose one
                              </option>
                              {
                                ORIGINATOR_OPTIONS.map(originator => (
                                  <option value={originator} key={originator}>
                                    {originator}
                                  </option>
                                ))
                              }
                            </select>
                            <div className="help-block with-errors" />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="orgtype">
                              How are you applying?
                            </label>
                            <select
                              name="subscriber[orgtype]"
                              id="orgtype"
                              className="input-lg form-control"
                              pattern=".{5,100}"
                              required
                              data-error="Please select an item from the list."
                              value={subscriber["orgtype"]}
                              onChange={this.updateForm("orgtype")}
                            >
                              <option disabled="disabled" value="">
                                Choose one
                              </option>
                              <option value="Company">
                                As a company
                              </option>
                              <option value="Individual">
                                As an individual
                              </option>
                            </select>
                            <div className="help-block with-errors" />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="interest">
                              Why are you interested in adopting or replicating this business model?
                            </label>
                            <textarea
                              type="text"
                              name="subscriber[interest]"
                              id="interest"
                              className="input-lg form-control"
                              pattern=".{5,100}"
                              value={subscriber["interest"]}
                              onChange={this.updateForm("interest")}
                              rows={6}
                              required
                            />
                            <div className="help-block with-errors" />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="profile">
                              What makes you a good fit for replicating the model? How well do you respond to the adopter criteria shown in the adopter profile?
                            </label>
                            <textarea
                              type="text"
                              name="subscriber[profile]"
                              id="profile"
                              className="input-lg form-control"
                              placeholder="Please provide as much details as possible on your relevant experience."
                              pattern=".{5,100}"
                              value={subscriber["profile"]}
                              onChange={this.updateForm("profile")}
                              rows={6}
                              required
                            />
                            <div className="help-block with-errors" />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="financing">
                              How would you potentially finance/co-finance the replication of the model?
                            </label>
                            <textarea
                              type="text"
                              name="subscriber[financing]"
                              id="financing"
                              className="input-lg form-control"
                              pattern=".{5,100}"
                              value={subscriber["financing"]}
                              onChange={this.updateForm("financing")}
                              rows={6}
                              required
                            />
                            <div className="help-block with-errors" />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="additional">
                              Any additional info?
                            </label>
                            <input
                              type="text"
                              name="subscriber[additional]"
                              id="additional"
                              className="input-lg form-control"
                              pattern=".{5,100}"
                              value={subscriber["additional"]}
                              onChange={this.updateForm("additional")}
                            />
                            <div className="help-block with-errors" />
                          </div>

                        </div>
                      }

                      { this.props.subscriberForm.role ==="Partner" &&

                        <div className="cf-right-col">

                          <div className="form-group">
                            <label className="form-label" htmlFor="partner_bmodel">
                              Which model(s) are you interested in? (press ⌘ or CTRL and click to select multiple)
                            </label>
                            <select
                              name="subscriber[partner_bmodel]"
                              id="partner_bmodel"
                              className="form-control"
                              pattern=".{5,100}"
                              required
                              multiple
                              data-error="Please select an item from the list."
                              value={subscriber["partner_bmodel"]}
                              onChange={this.updateFormMultiSelect("partner_bmodel")}
                            >
                              {
                                ORIGINATOR_OPTIONS.map(originator => (
                                  <option value={originator} key={originator}>
                                    {originator}
                                  </option>
                                ))
                              }
                            </select>
                            <div className="help-block with-errors" />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="support_region">
                              Which countries or regions does your organization support?
                            </label>
                            <select
                              name="subscriber[support_region]"
                              id="support_region"
                              className="form-control"
                              pattern=".{5,100}"
                              required
                              multiple
                              data-error="Please select an item from the list."
                              value={subscriber["support_region"]}
                              onChange={this.updateFormMultiSelect("support_region")}
                            >
                              {
                                PARTNER_REGION_OPTIONS.map(region => (
                                  <option value={region} key={region}>
                                    {region}
                                  </option>
                                ))
                              }
                            </select>
                            <div className="help-block with-errors" />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="partner_sector">
                              In which sectors do you work?
                            </label>
                            <select
                              name="subscriber[partner_sector]"
                              id="partner_sector"
                              className="form-control"
                              pattern=".{5,100}"
                              required
                              multiple
                              data-error="Please select an item from the list."
                              value={subscriber["partner_sector"]}
                              onChange={this.updateFormMultiSelect("partner_sector")}
                            >
                              <option value="Agriculture">
                                Agriculture
                              </option>
                              <option value="Health">
                                Health
                              </option>
                              <option value="Energy">
                                Energy
                              </option>
                              <option value="ICT">
                                ICT
                              </option>
                            </select>
                            <div className="help-block with-errors" />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="support_type">
                              What kind of support can you offer originators?
                            </label>
                            <select
                              name="subscriber[support_type]"
                              id="support_type"
                              className="form-control"
                              pattern=".{5,100}"
                              required
                              multiple
                              data-error="Please select an item from the list."
                              value={subscriber["support_type"]}
                              onChange={this.updateFormMultiSelect("support_type")}
                            >
                              <option value="Company">
                                Financial support
                              </option>
                              <option value="Individual">
                                Non-financial support
                              </option>
                            </select>
                            <div className="help-block with-errors" />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="additonal_support">
                              Please provide more details on how you can support originators.
                            </label>
                            <textarea
                              type="text"
                              name="subscriber[additonal_support]"
                              id="additonal_support"
                              className="input-lg form-control"
                              pattern=".{5,100}"
                              value={subscriber["additonal_support"]}
                              onChange={this.updateForm("additonal_support")}
                              rows={6}
                              required
                            />
                            <div className="help-block with-errors" />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="additional">
                              Any additional info?
                            </label>
                            <input
                              type="text"
                              name="subscriber[additional]"
                              id="additional"
                              className="input-lg form-control"
                              pattern=".{5,100}"
                              value={subscriber["additional"]}
                              onChange={this.updateForm("additional")}
                            />
                            <div className="help-block with-errors" />
                          </div>

                        </div>
                      }

                      <div className="clearfix">
                        <div className="cf-left-col">
                          <div className="form-tip pt-20">
                            <i className="fa fa-info-circle" /> All the fields
                            are required
                          </div>
                        </div>

                        <div className="cf-right-col">
                          <div className="align-right pt-10">
                            <button
                              type="submit"
                              className="submit_btn btn btn-mod btn-color btn-large"
                              id="submit_btn"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>

                      <div id="result" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: { eq: "home" }) {
      id
      title
      slug
      content
    }
    allOriginators(filter: { year: { eq: 2019 }}) {
      edges {
        node {
          id
          title
          representative_name
          representative_position
          slug
          year
          content
        }
      }
    }
  }
`;
