import styles from './Footer.module.css';

const linkGroups = [
  {
    title: 'Company',
    links: ['About us', 'Find a store', 'Categories', 'Blogs'],
  },
  {
    title: 'Help',
    links: ['Customer service', 'My account', 'Find a store', 'Legal & privacy', 'Gift card'],
  },
  {
    title: 'Get inspired',
    links: ['Mobile app', 'Find a store', 'Contact us', 'Legal & privacy', 'Gift card'],
  },
  {
    title: 'Socials',
    links: ['Instagram', 'Facebook', 'Youtube', 'Twitter'],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {linkGroups.map((group) => (
          <div key={group.title} className={styles.col}>
            <h2 className={styles.colTitle}>{group.title}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link}>
                  <a href="#top">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`container ${styles.bottomBar}`}>
        <p>Copyright {new Date().getFullYear()} Appscrip task by Arunendra. All rights reserved.</p>
      </div>
    </footer>
  );
}
