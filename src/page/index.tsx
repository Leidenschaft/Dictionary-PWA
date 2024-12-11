import { Nav, NavbarBrand, NavLink, OffcanvasNavbar } from 'boot-cell';
import { createRouter } from 'cell-router';

import WebCell_0 from '../image/WebCell-0.png';
import { SearchPage } from './Search';
import { WordPage } from './Word';

const menu = [
    {
        title: 'GitHub source',
        href: 'https://github.com/Leidenschaft/Dictionary-PWA'
    }
];

const { Route } = createRouter();

export const PageFrame = () => (
    <>
        <OffcanvasNavbar
            variant="dark"
            expand="md"
            sticky="top"
            fluid="lg"
            brand={
                <NavbarBrand>
                    <img
                        className="me-2"
                        style={{ width: '2rem' }}
                        alt="WebCell"
                        src={WebCell_0}
                    />
                    Dictionary PWA
                </NavbarBrand>
            }
        >
            <Nav className="justify-content-end flex-fill gap-3">
                {menu.map(({ title, href }) => (
                    <NavLink href={href.startsWith('http') ? href : `#${href}`}>
                        {title}
                    </NavLink>
                ))}
            </Nav>
        </OffcanvasNavbar>

        <main className="container p-0" style={{ minHeight: '60vh' }}>
            <Route path="" component={SearchPage} />
            <Route path="word/:word" component={WordPage} />
        </main>

        <footer className="text-center bg-light py-5">
            Proudly developed with
            <a className="mx-1" target="_blank" href="https://web-cell.dev/" rel="noreferrer">
                WebCell v3
            </a>
            &amp;
            <a
                className="mx-1"
                target="_blank"
                href="https://web-cell.dev/BootCell/" rel="noreferrer"
            >
                BootCell v2
            </a>
        </footer>
    </>
);
