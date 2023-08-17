import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

const NewsletterSection = () => {
   return (
      <section className="newsletter-section">
         <div className="container">
            <Row gutter={24}>
               <Col span={12} lg={12} md={24} xs={24}>
                  <h2 className="experience-title" style={{ marginTop: 0 }}>
                     Subcribe DUONG now to get <br /> useful traveling information
                  </h2>
                  <Form
                     className="review-form subscribe-form"
                     layout="inline"
                     style={{ maxWidth: 404 }}
                  >
                     <Form.Item name="review" initialValue="" className="subscribe-form-input">
                        <Input placeholder="Enter your email" />
                     </Form.Item>
                     <Form.Item className="review-form-button subscribe-form-button">
                        <Button type="primary" htmlType="submit">
                           Subcribe
                        </Button>
                     </Form.Item>
                  </Form>
                  <p
                     style={{
                        fontSize: "16px",
                        lineHeight: 1.5,
                        fontWeight: 400,
                        overflow: "hidden",
                        wordBreak: "break-word",
                     }}
                  >
                     WE SO <br /> CHIPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
                  </p>
               </Col>
               <Col span={12} lg={12} md={24} xs={24}>
                  <div className="newsletter-image">
                     <img src="/images/male-tourist.png" alt="" />
                  </div>
               </Col>
            </Row>
         </div>
      </section>
   );
};

export default NewsletterSection;
