import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import moment from 'moment';

import Layout from '../components/layout';

import './booking.scss';

const BookingPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query BookingQuery {
      page: allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/booking/" } } }) {
        edges {
          node {
            frontmatter {
              title
              description
            }
          }
        }
      }
      blocks: allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/blocks/booking/" } } }
        sort: { fields: frontmatter___weight }
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            html
          }
        }
      }
    }
  `);

  const {
    frontmatter: { title, description },
  } = data.page.edges[0].node;

  const daysINeed = [2, 4, 6];

  function isThisInFuture(targetDayNum) {
    const todayNum = moment().isoWeekday();

    if (todayNum < targetDayNum) {
      return moment().isoWeekday(targetDayNum);
    }
    return false;
  }

  const renderDates = () => {
    const dates = [];
    let pointer = moment();
    while (dates.length < 6) {
      const next = pointer.add(1, 'days');

      if ([2, 4, 6].includes(next.day())) {
        dates.push(next.format('dddd, Do MMMM'));
      }
    }

    return dates.map((d) => (
      <option key={d} value={d}>
        {d}
      </option>
    ));
  };

  return (
    <Layout location={location} title={title} description={description}>
      <div className="o-booking o-container o-container--small u-pillar-box-large">
        <form
          name="booking"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/booking-thanks">
          <input type="hidden" name="form-name" value="booking" />
          <label className="o-form-element c-label" htmlFor="name">
            Name
            <input id="name" name="name" className="c-field" required />
          </label>
          <label className="o-form-element c-label" htmlFor="email">
            Email
            <input id="email" name="email" className="c-field" type="email" required />
          </label>
          <label className="o-form-element c-label" htmlFor="day">
            Day
            <select id="day" name="day[]" className="c-field" required>
              <option value="">Choose a day</option>
              {renderDates()}
            </select>
          </label>
          <label className="o-form-element c-label" htmlFor="time">
            Time slot
            <select id="time" name="time[]" className="c-field" required>
              <option value="">Choose a time</option>
              <option value="9am">9am</option>
              <option value="10am">10am</option>
              <option value="11am">11am</option>
              <option value="12pm">12pm</option>
              <option value="1pm">1pm</option>
              <option value="2pm">2pm</option>
              <option value="3pm">3pm</option>
              <option value="4pm">4pm</option>
              <option value="5pm">5pm</option>
            </select>
          </label>
          <div className="o-form-element">
            <button className="c-button c-button--block c-button--ghost">
              Request Booking
              <span className="c-button__icon-right">
                <i className="fas fa-calendar-alt"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
      <div className="o-booking">
        <div className="o-page">
          <section className="o-container o-container--large u-window-box-large u-copy">
            {data.blocks.edges.map(({ node }, i) => (
              <div key={node.frontmatter.title + i}>
                <h2 className="c-heading">{node.frontmatter.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: node.html }} />
              </div>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
