require('@cypress/xpath');
require('cypress-plugin-tab');

beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://bibliotecapublica.online/");
    loginUsuario("rogeriogelonezi@gmail.com", "#5ae3s8VU&Bh6VVaAGs8");
});

afterEach(() => {
    logoutUsuario();
});

describe('Testes', () => {
    it('Create', () => {
        cy.xpath("//a[normalize-space()='Cadastrar Livro']").should('be.visible').click();
        preencherCampoXPath("//input[@id='id_title']", "TESTE TITULO");
        preencherCampoXPath("//input[@id='id_subtitle']", "TESTE SUBTITULO");
        preencherCampoXPath("//input[@id='id_authors']", "TESTE AUTOR");
        preencherCampoXPath("//input[@id='id_publisher']", "TESTE EDITORA");
        preencherCampoXPath("//input[@id='id_published_date']", "01/01/2024");
        preencherCampoXPath("//input[@id='id_page_count']", "100");
        preencherCampoXPath("//input[@id='id_categories']", "Aventura");
        preencherCampoXPath("//input[@id='id_language']", "Portugues");
        cy.scrollTo('bottom');
        preencherCampoXPath("//input[@id='id_thumbnail_external_url']", "https://img.freepik.com/vetores-premium/teste-online-para-modelo-de-livros-de-folhetos-de-banners-e-capa-de-revista_25147-1046.jpg");
        preencherCampoXPath("//textarea[@id='id_description']", "TESTE DESCRICAO");
        cy.xpath("//button[normalize-space()='Salvar']").should('be.visible').click();
        cy.xpath("//div[@role='alert' and contains(text(), 'Livro adicionado com sucesso!')]").should('be.visible');
    });

    it('Update', () => {
        buscarLivro("TESTE");
        cy.xpath("(//img[@alt='Capa do livro'])[1]").should('be.visible').click();
        cy.xpath("//button[normalize-space()='Editar']").should('be.visible').click();
        preencherCampoXPath("//input[@id='id_subtitle']", "TESTE SUBTITULO ALTERACAO");
        cy.scrollTo('bottom');
        cy.xpath("//button[normalize-space()='Salvar']").should('be.visible').click();
        cy.xpath("//div[@role='alert' and contains(text(), 'Livro editado com sucesso!')]").should('be.visible');
    });

    it('Delete', () => {
        buscarLivro("TESTE");
        cy.xpath("(//img[@alt='Capa do livro'])[1]").should('be.visible').click();
        cy.xpath("//button[normalize-space()='Excluir']").should('be.visible').click();
        cy.xpath("//div[@role='alert' and contains(text(), 'Livro excluído com sucesso.')]").should('be.visible');
    });

    it('Import', () => {
        cy.xpath("//a[normalize-space()='Importar Livro']").should('be.visible').click();
        preencherCampoXPath("//input[@id='id_isbn']", "8535909559");
        cy.xpath("//button[normalize-space()='Importar']").should('be.visible').click();
        buscarLivro("A revolu");
        cy.xpath("//h5[normalize-space()='A revolução dos bichos']").should('be.visible');
        cy.xpath("(//img[@alt='404'])[1]").should('be.visible').click();
        cy.xpath("//button[normalize-space()='Excluir']").should('be.visible').click();
        cy.xpath("//div[@role='alert' and contains(text(), 'Livro excluído com sucesso.')]").should('be.visible');
    });
});

function loginUsuario(usuario, senha) {
    cy.xpath("//a[normalize-space()='Entrar']").should('be.visible').click();
    preencherCampoXPath("//input[@id='id_email_usuario']", usuario);
    preencherCampoXPath("//input[@id='id_senha']", senha);
    cy.xpath("//button[normalize-space()='Entrar']").should('be.visible').click();
    cy.xpath("//div[@role='alert' and contains(text(), 'Login efetuado com sucesso')]").should('be.visible');
    cy.xpath("//button[@aria-label='Close']").should('be.visible').click();
}

function logoutUsuario() {
    cy.xpath("//a[normalize-space()='Sair']").should('be.visible').click();
}

function preencherCampoXPath(xpath, texto) {
    cy.xpath(xpath)
        .should('be.visible')
        .click().clear().should('be.empty')
        .type(texto);
}

function buscarLivro(titulo) {
    preencherCampoXPath("//input[@placeholder='Busca por título']", titulo);
    cy.xpath("//i[@class='bi bi-search']").should('be.visible').click();
}