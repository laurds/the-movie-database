# 🎬 Catálogo de Filmes - React + Laravel + Docker

Aplicação full stack para consultar filmes usando a API pública do TMDB, salvar favoritos e filtrá-los por gênero.  


---

## 🚀 Tecnologias

- ⚛️ React.js (Vite)
- 🐘 PHP 8.2 + Laravel 11
- 🐬 MySQL
- 🐳 Docker + Docker Compose
- 🎞️ API do The Movie Database (TMDB)

---

## 📦 Como rodar o projeto localmente com Docker

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/laurds/the-movie-database.git
cd the-movie-database
```

### 2️⃣ Criar o `.env` do Laravel

```bash
cd backend
cp .env
```

Verifique se contém:

```env
APP_URL=http://localhost:8000
DB_HOST=db
DB_DATABASE=movie_database
DB_USERNAME=laravel
DB_PASSWORD=laravel
```

---

### 3️⃣ Subir os containers

```bash
cd ..
docker-compose up -d --build
```

---

### 4️⃣ Gerar chave da aplicação Laravel

```bash
docker-compose exec app php artisan key:generate
```

---

## 🗃️ Como importar o banco de dados

### 🔧 Rodar as migrations

```bash
docker-compose exec app php artisan migrate
```

---

## 📁 Onde está implementado o CRUD

| Elemento         | Caminho                                                          |
|------------------|------------------------------------------------------------------|
| 📄 Rotas         | `backend/routes/web.php`                                         |
| 🧠 Controller    | `backend/app/Http/Controllers/FavoriteController.php`            |
| 🧾 Model         | `backend/app/Models/Favorite.php`                                |
| 🗃️ Migration     | `backend/database/migrations/xxxx_create_favorites_table.php`    |
| 🎨 Views (React) | `frontend/src/App.jsx`, `FavoritesPage.jsx`, `components/`       |

---

## 🔑 Obter sua chave da API do TMDB

1. Acesse: [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Crie uma conta gratuita
3. Vá em **Configurações > API** e gere uma **API Key v3**
4. Crie o arquivo `.env` na pasta `frontend/` e insira a variavel de ambiente:

```env
VITE_TMDB_API_KEY=sua_api_key
```

5. Reinicie o Vite:

```bash
npm run dev
```

---

## 🌐 Como subir o frontend separado

### 📍 Dentro da pasta `frontend/`

```bash
cd frontend
npm install
npm run dev
```

🔗 Acesse: `http://localhost:5173`

---

