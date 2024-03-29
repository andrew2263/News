import React from 'react';

import styles from './Contacts.module.scss';

const Contacts = () => {
  return (
    <React.Fragment>
      <div className={ styles.contacts }>
        <div className={ styles['contacts__item'] }>
          <p>Служба поддержки</p>
          <p>
            <a href="tel:+37322777555">+373 (22) 777 555</a>
          </p>
          <p>
            <a href="mailto:support@newsmd.md">support@newsmd.md</a>
          </p>
        </div>
        <div className={ styles['contacts__item'] }>
          <p>Размещение рекламы</p>
          <p>
            <a href="tel:+37322777666">+373 (22) 777 666</a>
          </p>
          <p>
            <a href="mailto:sales@newsmd.md">sales@newsmd.md</a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contacts;
