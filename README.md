# APAE

## 📁 Estrutura do Projeto

```
APAE/
├── api/
│   ├── config.php
│   ├── processa_admin_login.php
│   ├── [outros scripts PHP de backend]
├── css/
│   ├── admin.css
│   ├── listagem.css
│   ├── navbar.css
│   ├── rodape.css
├── js/
│   ├── navbar.js
│   ├── rodape.js
│   ├── listagem.js
├── img/
│   └── autismo_logo.png
├── admin.php
├── listagem.php
├── cadastro.html
├── login.php
├── README.md
```
## 🛠 Tecnologias Utilizadas

- **PHP (PDO)**
- **MySQL**
- **HTML5 / CSS3 / JavaScript**
- **XAMPP** (Apache + MySQL)

## 🔧 Configuração
- Instale o XAMPP ou similar.

- Clone este repositório ou extraia o .zip na pasta htdocs do XAMPP

- Importe o arquivo SQL (crie um apae.sql com a estrutura de usuarios, pacientes, etc. ou use o phpMyAdmin para importar).
```
CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nome_completo` varchar(255) NOT NULL,
  `cid` varchar(20) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `nome_responsavel` varchar(255) DEFAULT NULL,
  `vinculo_familiar` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `composicao_familiar` text DEFAULT NULL,
  `valor_componente_familiar` decimal(10,2) DEFAULT NULL,
  `bpc` varchar(50) DEFAULT NULL,
  `bolsa_familia` varchar(50) DEFAULT NULL,
  `pessoas_trabalham` int(11) DEFAULT NULL,
  `renda_familiar` decimal(10,2) DEFAULT NULL,
  `residencia` varchar(100) DEFAULT NULL,
  `matriculado` tinyint(1) DEFAULT NULL,
  `mediador` varchar(255) DEFAULT NULL,
  `serie` varchar(50) DEFAULT NULL,
  `escola` varchar(255) DEFAULT NULL,
  `nome_escola` varchar(255) DEFAULT NULL,
  `turno` varchar(50) DEFAULT NULL,
  `fisioterapia` tinyint(1) DEFAULT NULL,
  `pintura` tinyint(1) DEFAULT NULL,
  `musica` tinyint(1) DEFAULT NULL,
  `hidroterapia` tinyint(1) DEFAULT NULL,
  `informatica` tinyint(1) DEFAULT NULL,
  `terapia_ocupacional` tinyint(1) DEFAULT NULL,
  `fonoaudiologia` tinyint(1) DEFAULT NULL,
  `psicologia` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```
```
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo_usuario` enum('admin','funcionario','outro') NOT NULL DEFAULT 'funcionario',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

-> Criar o Admin
```
INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `tipo_usuario`, `created_at`) VALUES
(1, 'Admin', 'admin@apae.com', '$2y$10$69yi3TEQTRyMpIrY.WT5s.COLAePx88jztAMazOfs99SI6uRzyztK', 'admin', '2025-06-28 19:44:29');

```


- Verifique se o arquivo api/config.php está configurado corretamente:

```php
$host = 'localhost';
$db   = 'apae';
$user = 'root';
$pass = '';
```
- Acesse no navegador:

```
http://localhost/APAE
```
  
