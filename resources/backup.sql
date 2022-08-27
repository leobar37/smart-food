--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Debian 12.7-1.pgdg90+1)
-- Dumped by pg_dump version 13.5

-- Started on 2022-08-27 00:20:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 635 (class 1247 OID 16406)
-- Name: OrderPaymentMethodType; Type: TYPE; Schema: public; Owner: smartfooduser
--

CREATE TYPE public."OrderPaymentMethodType" AS ENUM (
    'CASH',
    'CREDIT_CARD',
    'PLIN',
    'YAPE'
);


ALTER TYPE public."OrderPaymentMethodType" OWNER TO smartfooduser;

--
-- TOC entry 547 (class 1247 OID 16394)
-- Name: OrderStatusType; Type: TYPE; Schema: public; Owner: smartfooduser
--

CREATE TYPE public."OrderStatusType" AS ENUM (
    'PENDING',
    'PAID',
    'CANCELLED',
    'DELIVERED',
    'IN_CART'
);


ALTER TYPE public."OrderStatusType" OWNER TO smartfooduser;

--
-- TOC entry 544 (class 1247 OID 16388)
-- Name: UserRolType; Type: TYPE; Schema: public; Owner: smartfooduser
--

CREATE TYPE public."UserRolType" AS ENUM (
    'ADMIN',
    'STAFF'
);


ALTER TYPE public."UserRolType" OWNER TO smartfooduser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 16469)
-- Name: Category; Type: TABLE; Schema: public; Owner: smartfooduser
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    title text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."Category" OWNER TO smartfooduser;

--
-- TOC entry 203 (class 1259 OID 16425)
-- Name: Client; Type: TABLE; Schema: public; Owner: smartfooduser
--

CREATE TABLE public."Client" (
    id text NOT NULL,
    phone text DEFAULT ''::text NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    "lastName" text DEFAULT ''::text NOT NULL,
    direction text DEFAULT ''::text NOT NULL,
    email text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."Client" OWNER TO smartfooduser;

--
-- TOC entry 205 (class 1259 OID 16450)
-- Name: Option; Type: TABLE; Schema: public; Owner: smartfooduser
--

CREATE TABLE public."Option" (
    id text NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    "limit" integer,
    label text DEFAULT ''::text NOT NULL,
    product text
);


ALTER TABLE public."Option" OWNER TO smartfooduser;

--
-- TOC entry 210 (class 1259 OID 16491)
-- Name: Order; Type: TABLE; Schema: public; Owner: smartfooduser
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "orderNumber" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    status public."OrderStatusType" DEFAULT 'IN_CART'::public."OrderStatusType",
    client text,
    metadata jsonb DEFAULT '{}'::jsonb,
    "paymentMethod" public."OrderPaymentMethodType"
);


ALTER TABLE public."Order" OWNER TO smartfooduser;

--
-- TOC entry 208 (class 1259 OID 16480)
-- Name: OrderLine; Type: TABLE; Schema: public; Owner: smartfooduser
--

CREATE TABLE public."OrderLine" (
    id text NOT NULL,
    "order" text,
    product text,
    "createdAt" timestamp(3) without time zone,
    quantity integer,
    price double precision,
    total double precision,
    selection jsonb DEFAULT '{}'::jsonb
);


ALTER TABLE public."OrderLine" OWNER TO smartfooduser;

--
-- TOC entry 209 (class 1259 OID 16489)
-- Name: Order_orderNumber_seq; Type: SEQUENCE; Schema: public; Owner: smartfooduser
--

CREATE SEQUENCE public."Order_orderNumber_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Order_orderNumber_seq" OWNER TO smartfooduser;

--
-- TOC entry 2980 (class 0 OID 0)
-- Dependencies: 209
-- Name: Order_orderNumber_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartfooduser
--

ALTER SEQUENCE public."Order_orderNumber_seq" OWNED BY public."Order"."orderNumber";


--
-- TOC entry 204 (class 1259 OID 16438)
-- Name: Product; Type: TABLE; Schema: public; Owner: smartfooduser
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    photo jsonb,
    name text DEFAULT ''::text NOT NULL,
    count integer,
    price double precision,
    excerpt text DEFAULT ''::text NOT NULL,
    category text,
    description text DEFAULT ''::text NOT NULL,
    "isAvalaible" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Product" OWNER TO smartfooduser;

--
-- TOC entry 206 (class 1259 OID 16460)
-- Name: SubOption; Type: TABLE; Schema: public; Owner: smartfooduser
--

CREATE TABLE public."SubOption" (
    id text NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    option text
);


ALTER TABLE public."SubOption" OWNER TO smartfooduser;

--
-- TOC entry 202 (class 1259 OID 16415)
-- Name: User; Type: TABLE; Schema: public; Owner: smartfooduser
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    email text DEFAULT ''::text NOT NULL,
    rol public."UserRolType",
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO smartfooduser;

--
-- TOC entry 2805 (class 2604 OID 16494)
-- Name: Order orderNumber; Type: DEFAULT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."Order" ALTER COLUMN "orderNumber" SET DEFAULT nextval('public."Order_orderNumber_seq"'::regclass);


--
-- TOC entry 2970 (class 0 OID 16469)
-- Dependencies: 207
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: smartfooduser
--

COPY public."Category" (id, name, description, title) FROM stdin;
cl6u80ywf00024ouq2sn5j5sq	armables	Arma tu plato o bebida como más te guste, elige los ingrediemte que más te gusten. Tenemos + de 25 ingredientes para crearlos.	Arma lo que más te guste
cl6u80zlu00114ouqtm14g7mq	armados	Elige entre toda la variedad de platos deliciosos que hemos armado pensando en ti.	Prueba nuestros armados para ti
cl6x4ng2463640xldu8mxc14g	Smothies	Elige entre toda la variedad de platos deliciosos que hemos armado pensando en ti.	Disfruta de nuestros Smothies
\.


--
-- TOC entry 2966 (class 0 OID 16425)
-- Dependencies: 203
-- Data for Name: Client; Type: TABLE DATA; Schema: public; Owner: smartfooduser
--

COPY public."Client" (id, phone, name, "lastName", direction, email) FROM stdin;
cl6u81k6l05944ouq4qs3e99f	123456789	Anonymus	Anonymus	no tiene	anonymus@anon.com
\.


--
-- TOC entry 2968 (class 0 OID 16450)
-- Dependencies: 205
-- Data for Name: Option; Type: TABLE DATA; Schema: public; Owner: smartfooduser
--

COPY public."Option" (id, name, "limit", label, product) FROM stdin;
cl6u813vb00704ouqqq7jbdgs	Salsas	2	Elige tus salsas (Hasta 2 opciones)	cl6u810wh00324ouqafe76sxs
cl6u812gl00464ouqcmmu5uso	Proteína	1	Elige tu proteína	cl6u810wh00324ouqafe76sxs
cl6u8135x00564ouq3ytr104q	Toppins	3	Elige tus Toppins (Puedes elegir hasta 3)	cl6u810wh00324ouqafe76sxs
cl6u8132g00544ouq9zdwvwib	Veggies	4	Elige tus veggies ( Hasta 4 opciones a elegir)	cl6u810wh00324ouqafe76sxs
cl6u811nl00414ouquk27qc9p	Base	1	Elige tu base	cl6u810wh00324ouqafe76sxs
\.


--
-- TOC entry 2973 (class 0 OID 16491)
-- Dependencies: 210
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: smartfooduser
--

COPY public."Order" (id, "orderNumber", "createdAt", status, client, metadata, "paymentMethod") FROM stdin;
cl6uat70w19270xldgijrat1m	1	2022-08-15 05:11:23.6	IN_CART	\N	{}	\N
cl6ub7uyz23370xldsddcqsws	2	2022-08-15 05:22:47.819	PENDING	\N	{"deliveryDetails": {"name": "JeanPaul", "sede": null, "phone": "923033531", "lastName": "oliva", "direction": "Calle Los Próceres 450", "reference": "Club arabe ", "deliveryType": "delivery"}}	YAPE
cl6ub8wa724860xldzqk1rwtu	3	2022-08-15 05:23:36.175	PENDING	\N	{"deliveryDetails": {"name": "Hh", "sede": null, "phone": "987654321", "lastName": "Hh", "direction": "H", "reference": "", "deliveryType": "delivery"}}	CREDIT_CARD
cl6uufg4p33900xldumufy0ik	4	2022-08-15 14:20:34.537	PENDING	\N	{"deliveryDetails": {"name": "Jassmin Alondra", "sede": null, "phone": "6141494657", "lastName": "Ortiz", "direction": "Holis leo", "reference": "Va quedando cool", "deliveryType": "delivery"}}	YAPE
cl6uyus2s36460xldf82nhomk	5	2022-08-15 16:24:28.324	IN_CART	\N	{}	\N
cl6zw7chg185230xldfiacgqin	6	2022-08-19 03:09:06.676	IN_CART	\N	{}	\N
cl75e6ggt241870xldbpa34i74	7	2022-08-22 23:31:09.149	PAID	\N	{"deliveryDetails": {"name": "jean paul", "sede": null, "phone": "923033531", "lastName": "oliva mera", "direction": "calle los proceres 450 urb latina", "reference": "espaldas de la plaza civica", "deliveryType": "delivery"}}	YAPE
cl75eewec244920xld5min08ra	8	2022-08-22 23:37:43.044	IN_CART	\N	{}	\N
cl75ehg7p246590xldkqtfsrv7	9	2022-08-22 23:39:42.037	IN_CART	\N	{}	\N
\.


--
-- TOC entry 2971 (class 0 OID 16480)
-- Dependencies: 208
-- Data for Name: OrderLine; Type: TABLE DATA; Schema: public; Owner: smartfooduser
--

COPY public."OrderLine" (id, "order", product, "createdAt", quantity, price, total, selection) FROM stdin;
cl6ub7vnm23540xldk3trol3h	cl6ub7uyz23370xldsddcqsws	cl6u810wh00324ouqafe76sxs	2022-08-15 05:22:48.704	1	24.9	24.9	{"options": [{"id": "cl6u813vb00704ouqqq7jbdgs", "options": ["cl6u819ax03714ouqgbbgwo6i", "cl6u818p903114ouqtd4grbsa"]}, {"id": "cl6u812gl00464ouqcmmu5uso", "options": ["cl6u817ls02044ouq225f02vh"]}, {"id": "cl6u8135x00564ouq3ytr104q", "options": ["cl6u819f703874ouqcv6d0cmb", "cl6u818tk03324ouq2540fen7", "cl6u817ln02024ouqm8d3ifwg"]}, {"id": "cl6u811nl00414ouquk27qc9p", "options": ["cl6u817eb01774ouqf17xao5f"]}, {"id": "cl6u8132g00544ouq9zdwvwib", "options": ["cl6u818m003094ouqe6zemccq", "cl6u8180702444ouqv3kuf2hq", "cl6u817ee01794ouq2k7eql1l", "cl6u815zn01114ouq8cnhpp1u"]}]}
cl6ub8wnr25080xld3odhbwud	cl6ub8wa724860xldzqk1rwtu	cl6u810wh00324ouqafe76sxs	2022-08-15 05:23:36.658	1	24.9	24.9	{"options": [{"id": "cl6u813vb00704ouqqq7jbdgs", "options": []}, {"id": "cl6u812gl00464ouqcmmu5uso", "options": []}, {"id": "cl6u8135x00564ouq3ytr104q", "options": []}, {"id": "cl6u811nl00414ouquk27qc9p", "options": []}, {"id": "cl6u8132g00544ouq9zdwvwib", "options": []}]}
cl6uufgvf34070xld1om08uql	cl6uufg4p33900xldumufy0ik	cl6u810wh00324ouqafe76sxs	2022-08-15 14:20:35.496	1	24.9	24.9	{"options": [{"id": "cl6u813vb00704ouqqq7jbdgs", "options": ["cl6u819ax03714ouqgbbgwo6i"]}, {"id": "cl6u812gl00464ouqcmmu5uso", "options": ["cl6u816p101354ouqgdyiyp2j"]}, {"id": "cl6u8135x00564ouq3ytr104q", "options": ["cl6u81a0x04284ouq7f528wfh"]}, {"id": "cl6u811nl00414ouquk27qc9p", "options": ["cl6u818ls03074ouq96affz9r"]}, {"id": "cl6u8132g00544ouq9zdwvwib", "options": ["cl6u81b1204574ouq6ubyemgg"]}]}
cl751nsmz218350xldoav18cse	cl6uat70w19270xldgijrat1m	cl6u81d5p04984ouqv3bn3gvq	2022-08-22 17:40:43.064	1	25	25	{}
cl6uyuspq36630xld7hpr7lu2	cl6uyus2s36460xldf82nhomk	\N	2022-08-15 16:24:29.126	1	25	25	{}
cl75e6h3z242040xld1aco1jvl	cl75e6ggt241870xldbpa34i74	cl6x6k2cx76700xld2zzegriy	2022-08-22 23:31:09.982	1	17.9	17.9	{}
cl75eewqy245090xld3l5iopk5	cl75eewec244920xld5min08ra	cl6u810wh00324ouqafe76sxs	2022-08-22 23:37:43.496	1	24.9	24.9	{"options": [{"id": "cl6u812gl00464ouqcmmu5uso", "options": ["cl6u816p101354ouqgdyiyp2j"]}, {"id": "cl6u813vb00704ouqqq7jbdgs", "options": ["cl6u819ax03714ouqgbbgwo6i", "cl6u818p903114ouqtd4grbsa"]}, {"id": "cl6u811nl00414ouquk27qc9p", "options": ["cl6u818ls03074ouq96affz9r"]}, {"id": "cl6u8132g00544ouq9zdwvwib", "options": ["cl6u81b1204574ouq6ubyemgg", "cl6u819tg04184ouqciuf4aym"]}, {"id": "cl6u8135x00564ouq3ytr104q", "options": ["cl6u81a0x04284ouq7f528wfh", "cl6u8187u02674ouq5xgqe0ii"]}]}
cl75ehgl8246760xldca2k1a6p	cl75ehg7p246590xldkqtfsrv7	cl6u810wh00324ouqafe76sxs	2022-08-22 23:39:42.523	1	24.9	24.9	{"options": [{"id": "cl6u812gl00464ouqcmmu5uso", "options": ["cl6u816p101354ouqgdyiyp2j"]}, {"id": "cl6u813vb00704ouqqq7jbdgs", "options": ["cl6u819ax03714ouqgbbgwo6i", "cl6u818p903114ouqtd4grbsa"]}, {"id": "cl6u811nl00414ouquk27qc9p", "options": ["cl6u818ls03074ouq96affz9r"]}, {"id": "cl6u8132g00544ouq9zdwvwib", "options": ["cl6u81b1204574ouq6ubyemgg", "cl6u819tg04184ouqciuf4aym", "cl6u817ee01794ouq2k7eql1l", "cl6u815zn01114ouq8cnhpp1u"]}, {"id": "cl6u8135x00564ouq3ytr104q", "options": ["cl6u81a0x04284ouq7f528wfh", "cl6u8187u02674ouq5xgqe0ii", "cl6u816oz01334ouqr89vzc99"]}]}
cl75ehos5247310xldv6l5isov	cl75ehg7p246590xldkqtfsrv7	cl6u81fsn05204ouqfnlp3r1d	2022-08-22 23:39:53.139	1	25	25	{}
cl6zw7d95185400xldnr9ozx0h	cl6zw7chg185230xldfiacgqin	cl6y8mi8e129390xldhyge6tya	2022-08-19 03:09:07.672	5	25	125	{}
\.


--
-- TOC entry 2967 (class 0 OID 16438)
-- Dependencies: 204
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: smartfooduser
--

COPY public."Product" (id, photo, name, count, price, excerpt, category, description, "isAvalaible") FROM stdin;
cl6u810wh00324ouqafe76sxs	{"id": "cl753nio1000j0xld8ddd1rj2", "_meta": {"url": "http://res.cloudinary.com/wellnesspro/image/upload/v1661193389/cl753nio1000j0xld8ddd1rj2.webp", "etag": "de3bd646e77aef4015754eae7d78ae2b", "tags": [], "type": "upload", "bytes": 906936, "pages": 1, "width": 1920, "folder": "", "format": "webp", "height": 1920, "api_key": "827568399999768", "version": 1661193389, "asset_id": "1d7ea034a4b5dda609eaa5d36623addf", "public_id": "cl753nio1000j0xld8ddd1rj2", "signature": "e8d18324d6ab0779447b32d5d8b3ff86e333fe3d", "created_at": "2022-08-22T18:36:29Z", "secure_url": "https://res.cloudinary.com/wellnesspro/image/upload/v1661193389/cl753nio1000j0xld8ddd1rj2.webp", "version_id": "a6f15cdcc8c96a7902f88dd5a0c11d99", "access_mode": "public", "placeholder": false, "resource_type": "image", "original_filename": "file"}, "encoding": "7bit", "filename": "smart16.webp", "mimetype": "image/webp", "originalFilename": "smart16.webp"}	Smart Bowl	\N	24.9		cl6u80ywf00024ouq2sn5j5sq	Arma tu propio plato	t
cl6x6r7b680530xldc1kf8h08	{"id": "cl753leov000f0xldhu0rar8k", "_meta": {"url": "http://res.cloudinary.com/wellnesspro/image/upload/v1661193291/cl753leov000f0xldhu0rar8k.webp", "etag": "96c762357565e1f9331e9a8bd3e244cf", "tags": [], "type": "upload", "bytes": 740720, "pages": 1, "width": 1920, "folder": "", "format": "webp", "height": 1920, "api_key": "827568399999768", "version": 1661193291, "asset_id": "adacbe9f214b71de81eab25a820e9d6d", "public_id": "cl753leov000f0xldhu0rar8k", "signature": "9c6565ff3ef83752a9445484105c154589c4c608", "created_at": "2022-08-22T18:34:51Z", "secure_url": "https://res.cloudinary.com/wellnesspro/image/upload/v1661193291/cl753leov000f0xldhu0rar8k.webp", "version_id": "d457ce1a729ab1fb83e9443eabb2a072", "access_mode": "public", "placeholder": false, "resource_type": "image", "original_filename": "file"}, "encoding": "7bit", "filename": "smart22.webp", "mimetype": "image/webp", "originalFilename": "smart22.webp"}	Berry Bowl	\N	17.9		cl6x4ng2463640xldu8mxc14g	## Contenido\n- Arándanos\n- Fresa\n- Plátano\n- Leche de almendras	t
cl6u81fsn05204ouqfnlp3r1d	{"id": "cl7538ckn000b0xld2229hsna", "_meta": {"url": "http://res.cloudinary.com/wellnesspro/image/upload/v1661192681/cl7538ckn000b0xld2229hsna.webp", "etag": "4e8d59ecf8e14649af3fb6d6ae326b58", "tags": [], "type": "upload", "bytes": 434972, "pages": 1, "width": 1920, "folder": "", "format": "webp", "height": 1080, "api_key": "827568399999768", "version": 1661192681, "asset_id": "4809f9811515dd2bb5a4a6930d4364eb", "public_id": "cl7538ckn000b0xld2229hsna", "signature": "2ac53d46a6f634247baaae1368d9d2c221f71c95", "created_at": "2022-08-22T18:24:41Z", "secure_url": "https://res.cloudinary.com/wellnesspro/image/upload/v1661192681/cl7538ckn000b0xld2229hsna.webp", "version_id": "0080da61b43b226f2a3ff15e788edd76", "access_mode": "public", "placeholder": false, "resource_type": "image", "original_filename": "file"}, "encoding": "7bit", "filename": "smart2.webp", "mimetype": "image/webp", "originalFilename": "smart2.webp"}	Crunch Bowl	\N	25	Ideal para personas en \ndefinición	cl6u80zlu00114ouqtm14g7mq	## Contenido\n**Base** \n - Arroz integral\n\n**Proteina** \n - Pollo Teriyaki\n- Dulce\n\n**Veggies** \n- Palta\n- Choclo americano\n- Lechuga hidroponica\n- Zanahoria Rayada\n\n**Salsas** \n- Maracuyá\n- Agridulce\n- Smart hot\n- Picante\n\n**Toppins** \n- Canchita chulpi\n- Nori crocante\n- Aros de cebolla	t
cl6x6uau382560xldamemxyc4	{"id": "cl753lzc4000h0xldbnpvc77h", "_meta": {"url": "http://res.cloudinary.com/wellnesspro/image/upload/v1661193317/cl753lzc4000h0xldbnpvc77h.webp", "etag": "96c762357565e1f9331e9a8bd3e244cf", "tags": [], "type": "upload", "bytes": 740720, "pages": 1, "width": 1920, "folder": "", "format": "webp", "height": 1920, "api_key": "827568399999768", "version": 1661193317, "asset_id": "a8f3dff2c3765c89940ef37cbf1e8804", "public_id": "cl753lzc4000h0xldbnpvc77h", "signature": "c4da7cd5dc24eb57ef664c554d36cfbd17ad591a", "created_at": "2022-08-22T18:35:17Z", "secure_url": "https://res.cloudinary.com/wellnesspro/image/upload/v1661193317/cl753lzc4000h0xldbnpvc77h.webp", "version_id": "4de9243d57cf9e956c07f21eff7b0c10", "access_mode": "public", "placeholder": false, "resource_type": "image", "original_filename": "file"}, "encoding": "7bit", "filename": "smart22.webp", "mimetype": "image/webp", "originalFilename": "smart22.webp"}	Green Bowl	\N	17.9		cl6x4ng2463640xldu8mxc14g	## Contenido\n- Base de espinaca\n- Mango\n- Plátano\n- Maracuyá\n- Leche de coco	t
cl6u81d5p04984ouqv3bn3gvq	{"id": "cl75358co00080xld9t9qgxq5", "_meta": {"url": "http://res.cloudinary.com/wellnesspro/image/upload/v1661192536/cl75358co00080xld9t9qgxq5.webp", "etag": "4e8d59ecf8e14649af3fb6d6ae326b58", "tags": [], "type": "upload", "bytes": 434972, "pages": 1, "width": 1920, "folder": "", "format": "webp", "height": 1080, "api_key": "827568399999768", "version": 1661192536, "asset_id": "a4c4fb03122e9e1a320ac656b1525bc5", "public_id": "cl75358co00080xld9t9qgxq5", "signature": "3d487a2c2bec2fc587c8b33fd9fe8b3dd19dde87", "created_at": "2022-08-22T18:22:16Z", "secure_url": "https://res.cloudinary.com/wellnesspro/image/upload/v1661192536/cl75358co00080xld9t9qgxq5.webp", "version_id": "a77db750d09c1de50fb75bb86ba839a2", "access_mode": "public", "placeholder": false, "resource_type": "image", "original_filename": "file"}, "encoding": "7bit", "filename": "smart2.webp", "mimetype": "image/webp", "originalFilename": "smart2.webp"}	Slimming Bowl	\N	25		cl6u80zlu00114ouqtm14g7mq	## Contenido\n**Base**\n - Mix Lechugas (255gr)\n\n**Proteína** \n - Salmón Marinado 50 gr\n\n**Veggies** \n- Palta 45 gr\n- Choclo americano 30 gr\n- Tomate Cherry 40 gr  \n- Pepinillo 40gr\n\n**Salsas**  \n- Acevichada\n- Salada x 1 (1 1/2 oz)\n\n**Toppins**  \n- Canchita chulpi 20 gr\n- Chifle 20 gr	t
cl6y8mi8e129390xldhyge6tya	{"id": "cl7534eby00070xld6kja0os3", "_meta": {"url": "http://res.cloudinary.com/wellnesspro/image/upload/v1661192497/cl7534eby00070xld6kja0os3.webp", "etag": "a1ee3c398593c59321936bf5ca41962e", "tags": [], "type": "upload", "bytes": 222650, "pages": 1, "width": 1920, "folder": "", "format": "webp", "height": 1080, "api_key": "827568399999768", "version": 1661192497, "asset_id": "01299c02c6f26799b320be578ed735b5", "public_id": "cl7534eby00070xld6kja0os3", "signature": "3aa0db447b5ab9f9f7395e4bf83d779333f301bd", "created_at": "2022-08-22T18:21:37Z", "secure_url": "https://res.cloudinary.com/wellnesspro/image/upload/v1661192497/cl7534eby00070xld6kja0os3.webp", "version_id": "ea64ab945becafda0ba7ea00ccfefd06", "access_mode": "public", "placeholder": false, "resource_type": "image", "original_filename": "file"}, "encoding": "7bit", "filename": "smart6.webp", "mimetype": "image/webp", "originalFilename": "smart6.webp"}	Soft Fit Bowl	\N	25	Hecho a base de ingredientes bajos\nen calorías	cl6u80zlu00114ouqtm14g7mq	## Contenido\n**Base**\n- Quinua multicolor\n\n**Proteína**\n- Salmón marinado\n\n**Veggies**\n- Palta\n- Choclo\n- Lechuga\n- Piña\n\n**Salsa**\n- Maracuyá\n- Acevichada - salada\n\n**Toppins**\n- Ajonjolí\n- Aros de cebolla\n- Canchita chulpi	t
cl6u81gej05314ouquy4dwqi2	{"id": "cl75363xa00090xld2eb2a2le", "_meta": {"url": "http://res.cloudinary.com/wellnesspro/image/upload/v1661192577/cl75363xa00090xld2eb2a2le.webp", "etag": "19bfdd75c6ab68589e5184516cb842fc", "tags": [], "type": "upload", "bytes": 318832, "pages": 1, "width": 1920, "folder": "", "format": "webp", "height": 1080, "api_key": "827568399999768", "version": 1661192577, "asset_id": "257ef2a882575e8bea7960f23d36a752", "public_id": "cl75363xa00090xld2eb2a2le", "signature": "8a37b81ebd31e601f97499b84e01d72bc601d618", "created_at": "2022-08-22T18:22:57Z", "secure_url": "https://res.cloudinary.com/wellnesspro/image/upload/v1661192577/cl75363xa00090xld2eb2a2le.webp", "version_id": "b2acb584a34a7d0c4ea9701aec10caa3", "access_mode": "public", "placeholder": false, "resource_type": "image", "original_filename": "file"}, "encoding": "7bit", "filename": "smart7.webp", "mimetype": "image/webp", "originalFilename": "smart7.webp"}	Fatten Bowl	\N	25	Rico en proteinas, ideal\npara subir masa muscular	cl6u80zlu00114ouqtm14g7mq	## Contenido\n**Base** \n- Arroz integral 80 g\n\n**Proteina** \n- Pollo Teriyaki\n- Dulce 60 gr \n\n**Veggies** \n- Palta 45 gr\n- Choclo americano 30 gr\n- Lechuga hidroponica  35 gr \n- Zanahoria Rayada 30 gr \n\n**Salsas** \n- Maracuyá\n- Agridulce ( 1 1/2 oz)\n- Smart hot\n- Picante ( 1 1/2 oz)\n\n **Toppins** \n- Canchita chulpi 20 gr\n- Nori crocante 5 gr\n- Aros de cebolla 50 gr	t
cl6u81f6e05094ouqjkv9wm1b	{"id": "cl7539d7o000c0xldcw9h7mul", "_meta": {"url": "http://res.cloudinary.com/wellnesspro/image/upload/v1661192729/cl7539d7o000c0xldcw9h7mul.webp", "etag": "bac64730f0057debdd8c87dd8d0e6cdd", "tags": [], "type": "upload", "bytes": 220596, "pages": 1, "width": 1920, "folder": "", "format": "webp", "height": 1080, "api_key": "827568399999768", "version": 1661192729, "asset_id": "ca45016d7126b6a55a0ded188050b0f1", "public_id": "cl7539d7o000c0xldcw9h7mul", "signature": "7e9efe7be26fed188567f82099af029cc81e0cfe", "created_at": "2022-08-22T18:25:29Z", "secure_url": "https://res.cloudinary.com/wellnesspro/image/upload/v1661192729/cl7539d7o000c0xldcw9h7mul.webp", "version_id": "cb343912bc3fa31335f3585ecd5bfb4a", "access_mode": "public", "placeholder": false, "resource_type": "image", "original_filename": "file"}, "encoding": "7bit", "filename": "smart5.webp", "mimetype": "image/webp", "originalFilename": "smart5.webp"}	Fit Bowl	\N	25	Hecho a base de ingredientes bajos\nen calorías. Contiene quinua multicolor, filete de Pollo , choclo americano...	cl6u80zlu00114ouqtm14g7mq	## Contenido\n**Base** \n- Quinua multicolor\n\n**Proteína** \n- Filete de Pollo\n\n**Veggies** \n- Palta\n- Choclo americano\n- Pepino kyuri\n- Durazno\n\n**Salsas** \n- Acevichada\n\n**Toppins** \n- Smart hot \n- Picante	t
cl6x6k2cx76700xld2zzegriy	{"id": "cl753lm08000g0xld8kgn6d04", "_meta": {"url": "http://res.cloudinary.com/wellnesspro/image/upload/v1661193300/cl753lm08000g0xld8kgn6d04.webp", "etag": "96c762357565e1f9331e9a8bd3e244cf", "tags": [], "type": "upload", "bytes": 740720, "pages": 1, "width": 1920, "folder": "", "format": "webp", "height": 1920, "api_key": "827568399999768", "version": 1661193300, "asset_id": "8b61bc000adf2a280b3b257ee0530b17", "public_id": "cl753lm08000g0xld8kgn6d04", "signature": "9d647740e34f8b9267dcc189296dae28a1ccfa15", "created_at": "2022-08-22T18:35:00Z", "secure_url": "https://res.cloudinary.com/wellnesspro/image/upload/v1661193300/cl753lm08000g0xld8kgn6d04.webp", "version_id": "8d05acc9ece21d1c6f4a567d9c3eb4ba", "access_mode": "public", "placeholder": false, "resource_type": "image", "original_filename": "file"}, "encoding": "7bit", "filename": "smart22.webp", "mimetype": "image/webp", "originalFilename": "smart22.webp"}	Dragón Bowl	\N	17.9		cl6x4ng2463640xldu8mxc14g	## Contenido\n- Pitahaya\n- Fresa\n- Plátano\n- Leche de almendras	t
cl6x4stlg64150xldjw13933n	{"id": "cl753m74x000i0xld4bib1sjk", "_meta": {"url": "http://res.cloudinary.com/wellnesspro/image/upload/v1661193327/cl753m74x000i0xld4bib1sjk.webp", "etag": "96c762357565e1f9331e9a8bd3e244cf", "tags": [], "type": "upload", "bytes": 740720, "pages": 1, "width": 1920, "folder": "", "format": "webp", "height": 1920, "api_key": "827568399999768", "version": 1661193327, "asset_id": "0c1fe3ba8734fa58900d1a16cd625e78", "public_id": "cl753m74x000i0xld4bib1sjk", "signature": "8cafefc3f301c1003995dd92c9d62ae3e6b2fa28", "created_at": "2022-08-22T18:35:27Z", "secure_url": "https://res.cloudinary.com/wellnesspro/image/upload/v1661193327/cl753m74x000i0xld4bib1sjk.webp", "version_id": "6ec09f61c16d2966fbacb440090f02f7", "access_mode": "public", "placeholder": false, "resource_type": "image", "original_filename": "file"}, "encoding": "7bit", "filename": "smart22.webp", "mimetype": "image/webp", "originalFilename": "smart22.webp"}	Hawaian Bowl	\N	17.9		cl6x4ng2463640xldu8mxc14g	## Contenido\n\n- Mango\n- Piña\n- Plátano\n- Leche de almendras	t
\.


--
-- TOC entry 2969 (class 0 OID 16460)
-- Dependencies: 206
-- Data for Name: SubOption; Type: TABLE DATA; Schema: public; Owner: smartfooduser
--

COPY public."SubOption" (id, name, option) FROM stdin;
cl6u815w901094ouq582lfjeo	Arroz Sushi	cl6u811nl00414ouquk27qc9p
cl6u817eb01774ouqf17xao5f	Arroz Integral	cl6u811nl00414ouquk27qc9p
cl6u8180202424ouql5jbq3ed	Quinoa Multicolor	cl6u811nl00414ouquk27qc9p
cl6u818ls03074ouq96affz9r	Mix Lechugas	cl6u811nl00414ouquk27qc9p
cl6u816lc01284ouq5a092ucc	Acevichada - salada	cl6u813vb00704ouqqq7jbdgs
cl6u817ls02044ouq225f02vh	Pollo Teriyaki- dulce	cl6u812gl00464ouqcmmu5uso
cl6u8187x02694ouq8of6735u	Salmón Marino	cl6u812gl00464ouqcmmu5uso
cl6u818tr03344ouqq211usr7	Atún Marinado	cl6u812gl00464ouqcmmu5uso
cl6u819fg03894ouq7h9h5icn	Toffu	cl6u812gl00464ouqcmmu5uso
cl6u816oz01334ouqr89vzc99	Ajonjolí	cl6u8135x00564ouq3ytr104q
cl6u817hs01814ouq3avobn2g	Oriental	cl6u813vb00704ouqqq7jbdgs
cl6u8183h02464ouqntooqrbc	Teriyaki	cl6u813vb00704ouqqq7jbdgs
cl6u818p903114ouqtd4grbsa	Maracuyá - agridulce	cl6u813vb00704ouqqq7jbdgs
cl6u819ax03714ouqgbbgwo6i	Smart hot - picante	cl6u813vb00704ouqqq7jbdgs
cl6u816p101354ouqgdyiyp2j	Filete de Pollo	cl6u812gl00464ouqcmmu5uso
cl6u817ln02024ouqm8d3ifwg	Canchita chulpi	cl6u8135x00564ouq3ytr104q
cl6u8187u02674ouq5xgqe0ii	Nori crocante	cl6u8135x00564ouq3ytr104q
cl6u818tk03324ouq2540fen7	Coliflor Crocante	cl6u8135x00564ouq3ytr104q
cl6u819f703874ouqcv6d0cmb	Aros de cebolla	cl6u8135x00564ouq3ytr104q
cl6u81a0x04284ouq7f528wfh	Camote frito	cl6u8135x00564ouq3ytr104q
cl6u815zn01114ouq8cnhpp1u	Palta	cl6u8132g00544ouq9zdwvwib
cl6u817ee01794ouq2k7eql1l	Choclo Americano	cl6u8132g00544ouq9zdwvwib
cl6u8180702444ouqv3kuf2hq	Tomate Cherry	cl6u8132g00544ouq9zdwvwib
cl6u818m003094ouqe6zemccq	Lechuga hidropónica	cl6u8132g00544ouq9zdwvwib
cl6u8197q03694ouqeopugto4	Col Morado	cl6u8132g00544ouq9zdwvwib
cl6u819tg04184ouqciuf4aym	Zanahoria Rayada	cl6u8132g00544ouq9zdwvwib
cl6u81afa04444ouq56iqphde	Pepino Kyuri	cl6u8132g00544ouq9zdwvwib
cl6u81b1204574ouq6ubyemgg	Frijol Negro	cl6u8132g00544ouq9zdwvwib
cl6u81bmw04704ouqc9z240zy	Piña	cl6u8132g00544ouq9zdwvwib
cl6u81c8v04834ouqja5ie6em	Mango	cl6u8132g00544ouq9zdwvwib
\.


--
-- TOC entry 2965 (class 0 OID 16415)
-- Dependencies: 202
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: smartfooduser
--

COPY public."User" (id, name, email, rol, password) FROM stdin;
cl6u74jef02200ouqkhk0rq9z	Elmer Joselito	usatloqueando@gmail.com	ADMIN	$2a$10$nf/KKCY6jYIO3RYlkGaQq.fy5XB1XGScvJZRa.n9TkVjXLYu/..ce
cl6x47zdq58160xldb7h5noam	Gianpierre	gianxs296@gmail.com	ADMIN	$2a$10$dA.tO9SBhGuWPHc7rZ6Ex.MEfCS4lUa9YVdlTO5F0vfHQ3Olm6NJm
\.


--
-- TOC entry 2981 (class 0 OID 0)
-- Dependencies: 209
-- Name: Order_orderNumber_seq; Type: SEQUENCE SET; Schema: public; Owner: smartfooduser
--

SELECT pg_catalog.setval('public."Order_orderNumber_seq"', 9, true);


--
-- TOC entry 2825 (class 2606 OID 16479)
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- TOC entry 2814 (class 2606 OID 16437)
-- Name: Client Client_pkey; Type: CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."Client"
    ADD CONSTRAINT "Client_pkey" PRIMARY KEY (id);


--
-- TOC entry 2819 (class 2606 OID 16459)
-- Name: Option Option_pkey; Type: CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."Option"
    ADD CONSTRAINT "Option_pkey" PRIMARY KEY (id);


--
-- TOC entry 2828 (class 2606 OID 16488)
-- Name: OrderLine OrderLine_pkey; Type: CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."OrderLine"
    ADD CONSTRAINT "OrderLine_pkey" PRIMARY KEY (id);


--
-- TOC entry 2832 (class 2606 OID 16502)
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- TOC entry 2817 (class 2606 OID 16449)
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- TOC entry 2823 (class 2606 OID 16468)
-- Name: SubOption SubOption_pkey; Type: CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."SubOption"
    ADD CONSTRAINT "SubOption_pkey" PRIMARY KEY (id);


--
-- TOC entry 2811 (class 2606 OID 16424)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 2812 (class 1259 OID 16504)
-- Name: Client_email_key; Type: INDEX; Schema: public; Owner: smartfooduser
--

CREATE UNIQUE INDEX "Client_email_key" ON public."Client" USING btree (email);


--
-- TOC entry 2820 (class 1259 OID 16506)
-- Name: Option_product_idx; Type: INDEX; Schema: public; Owner: smartfooduser
--

CREATE INDEX "Option_product_idx" ON public."Option" USING btree (product);


--
-- TOC entry 2826 (class 1259 OID 16508)
-- Name: OrderLine_order_idx; Type: INDEX; Schema: public; Owner: smartfooduser
--

CREATE INDEX "OrderLine_order_idx" ON public."OrderLine" USING btree ("order");


--
-- TOC entry 2829 (class 1259 OID 16509)
-- Name: OrderLine_product_idx; Type: INDEX; Schema: public; Owner: smartfooduser
--

CREATE INDEX "OrderLine_product_idx" ON public."OrderLine" USING btree (product);


--
-- TOC entry 2830 (class 1259 OID 16510)
-- Name: Order_client_idx; Type: INDEX; Schema: public; Owner: smartfooduser
--

CREATE INDEX "Order_client_idx" ON public."Order" USING btree (client);


--
-- TOC entry 2815 (class 1259 OID 16505)
-- Name: Product_category_idx; Type: INDEX; Schema: public; Owner: smartfooduser
--

CREATE INDEX "Product_category_idx" ON public."Product" USING btree (category);


--
-- TOC entry 2821 (class 1259 OID 16507)
-- Name: SubOption_option_idx; Type: INDEX; Schema: public; Owner: smartfooduser
--

CREATE INDEX "SubOption_option_idx" ON public."SubOption" USING btree (option);


--
-- TOC entry 2809 (class 1259 OID 16503)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: smartfooduser
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 2834 (class 2606 OID 16516)
-- Name: Option Option_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."Option"
    ADD CONSTRAINT "Option_product_fkey" FOREIGN KEY (product) REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2837 (class 2606 OID 16531)
-- Name: OrderLine OrderLine_order_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."OrderLine"
    ADD CONSTRAINT "OrderLine_order_fkey" FOREIGN KEY ("order") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2836 (class 2606 OID 16526)
-- Name: OrderLine OrderLine_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."OrderLine"
    ADD CONSTRAINT "OrderLine_product_fkey" FOREIGN KEY (product) REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2838 (class 2606 OID 16536)
-- Name: Order Order_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_client_fkey" FOREIGN KEY (client) REFERENCES public."Client"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2833 (class 2606 OID 16511)
-- Name: Product Product_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY (category) REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2835 (class 2606 OID 16521)
-- Name: SubOption SubOption_option_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartfooduser
--

ALTER TABLE ONLY public."SubOption"
    ADD CONSTRAINT "SubOption_option_fkey" FOREIGN KEY (option) REFERENCES public."Option"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2979 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA public TO leobar37;
GRANT USAGE ON SCHEMA public TO smartfooduser;


-- Completed on 2022-08-27 00:20:55

--
-- PostgreSQL database dump complete
--

