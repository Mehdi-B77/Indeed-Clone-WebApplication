import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
	Home,
	RegisterEmployeur,
	RegisterChercheur,
	Offre,
	HomeEmployeur,
	OffresEmployeur,
	CandidaturesEmployeur,
	OffreEmployeur,
	CandidatureEmployeur,
	HomeGestionnaire,
	InscriptionsGestionnaire,
	InscriptionGestionnaire,
	UtilisateursGestionnaire,
	UtilisateurEGestionnaire,
	StatistiquesGestionnaire,
	HomeAgence,
	FichiersAgence,
	FichierAgence,
	MetiersGestionnaire,
	HomeChercheur,
	AgendaChercheur,
	CandidaturesChercheur,
	CandidatureChercheur,
	EmploisChercheur,
	EmploiChercheur,
	ProfileChercheur,
	ProfileEmployeur,
	AbonnementsGestionnaire,
	AbonnementsEmployeur,
	EnregistrementsChercheur,
	PostulerChercheur,
	CandidaturesSpontanees,
	CandidatureSpontaneeChercheur,
	FavorisChercheur,
	EmploisEmployeur,
	EmploiEmployeur,
	UtilisateurCGestionnaire,
	RelationsChercheur,
	ProfileEtablissement,
	ConventionsChercheur,
	ConventionsEtablissement,
	ConventionsEmployeur,
	RegisterEtablissement,
	HomeEtablissement,
	ConnexionGestionnaire,


} from "./pages";


function App() {
	const accessToken = localStorage.getItem('accessToken');
	const user = JSON.parse(localStorage.getItem('user'));

	// Vérifie si l'utilisateur est connecté et est de type correspondant
	const isLoggedIn = (localStorage.getItem('accessToken') !== null);

	const isLoggedInEmployeur = accessToken && user && user.type === 'employeur';
	const isLoggedInChercheur = accessToken && user && user.type === 'chercheur';
	const isLoggedInGestionnaire = accessToken && user && user.type === 'gestionnaire';
	const isLoggedInEtablissement = accessToken && user && user.type === 'etablissement';
	const redirectToCorrectHome = () => {
		if (isLoggedInEmployeur) {
			return <Navigate to="/employeur" />;
		} else if (isLoggedInChercheur) {
			return <Navigate to="/chercheur" />;
		} else if (isLoggedInGestionnaire) {
			return <Navigate to="/gestionnaire" />;
		} else if (isLoggedInEtablissement) {
			return <Navigate to="/etablissement" />;
		} else {
			// Si aucun utilisateur n'est connecté, redirigez-le vers la page d'accueil générale
			return <Navigate to="/" />;
		}
	};

	return (

		<BrowserRouter>
			<Routes>
				<Route path='/' element={isLoggedIn ? redirectToCorrectHome() : <Home />} />
				<Route path='/register/employeur' element={isLoggedIn ? redirectToCorrectHome() : <RegisterEmployeur />} />
				<Route path='/register/chercheur' element={isLoggedIn ? redirectToCorrectHome() :<RegisterChercheur />} />
				<Route path='/register/etablissement' element={isLoggedIn ? redirectToCorrectHome() :<RegisterEtablissement />} />
				<Route path='/register/gestionnaire' element={isLoggedIn ? redirectToCorrectHome() :<ConnexionGestionnaire />} />
				<Route path='register/employeur/abonnements/' element={isLoggedIn ? redirectToCorrectHome() :<AbonnementsEmployeur />} />
				<Route path='/register/gestionnaire' element={isLoggedIn ? redirectToCorrectHome() :<ConnexionGestionnaire />} />
				<Route path='/offres/:id' element={<Offre />} />
				<Route path='/offres/:id/postuler' element={isLoggedInChercheur? 
				<PostulerChercheur /> :redirectToCorrectHome() } />

				{/*  Employeur */}


				<Route path='/employeur' element={isLoggedInEmployeur ? <HomeEmployeur /> : redirectToCorrectHome()} />
				<Route path='/employeur/offres' element={isLoggedInEmployeur ? <OffresEmployeur /> : redirectToCorrectHome()} />
				<Route path='/employeur/offres/:id' element={isLoggedInEmployeur ? <OffreEmployeur /> : redirectToCorrectHome()} />
				<Route path='/employeur/candidatures' element={isLoggedInEmployeur ? <CandidaturesEmployeur /> : redirectToCorrectHome()} />
				<Route path='/employeur/candidatures/:id' element={isLoggedInEmployeur ? <CandidatureEmployeur /> : redirectToCorrectHome()} />
				<Route path='/employeur/emplois' element={isLoggedInEmployeur ? <EmploisEmployeur /> : redirectToCorrectHome()} />
				<Route path='/employeur/emplois/:id' element={isLoggedInEmployeur ? <EmploiEmployeur /> : redirectToCorrectHome()} />
				<Route path='/employeur/profile' element={isLoggedInEmployeur ? <ProfileEmployeur /> : redirectToCorrectHome()} />
				<Route path='/employeur/conventions' element={isLoggedInEmployeur ? <ConventionsEmployeur /> : redirectToCorrectHome()} />

				{/*  Gestionnaire */}

				<Route path='/gestionnaire' element={isLoggedInGestionnaire ? <HomeGestionnaire /> : redirectToCorrectHome()} />
				<Route path='/gestionnaire/inscriptions' element={isLoggedInGestionnaire ? <InscriptionsGestionnaire /> : redirectToCorrectHome()} />
				<Route path='/gestionnaire/inscriptions/:id' element={isLoggedInGestionnaire ? <InscriptionGestionnaire /> : redirectToCorrectHome()} />
				<Route path='/gestionnaire/utilisateurs' element={isLoggedInGestionnaire ? <UtilisateursGestionnaire /> : redirectToCorrectHome()} />
				<Route path='/gestionnaire/utilisateurs/employeurs/:id' element={isLoggedInGestionnaire ? <UtilisateurEGestionnaire /> : redirectToCorrectHome()} />
				<Route path='/gestionnaire/utilisateurs/chercheurs/:id' element={isLoggedInGestionnaire ? <UtilisateurCGestionnaire /> : redirectToCorrectHome()} />
				<Route path='/gestionnaire/statistiques' element={isLoggedInGestionnaire ? <StatistiquesGestionnaire /> : redirectToCorrectHome()} />
				<Route path='/gestionnaire/metiers' element={isLoggedInGestionnaire ? <MetiersGestionnaire /> : redirectToCorrectHome()} />
				<Route path='/gestionnaire/abonnements' element={isLoggedInGestionnaire ? <AbonnementsGestionnaire /> : redirectToCorrectHome()} />

				{/*  Chercheur */}
				<Route path='/chercheur' element={isLoggedInChercheur ? <HomeChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/candidatures' element={isLoggedInChercheur ? <CandidaturesChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/candidatures/:id' element={isLoggedInChercheur ? <CandidatureChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/emplois' element={isLoggedInChercheur ? <EmploisChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/emplois/:id' element={isLoggedInChercheur ? <EmploiChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/agenda' element={isLoggedInChercheur ? <AgendaChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/candidaturesSpontanees' element={isLoggedInChercheur ? <CandidaturesSpontanees /> : redirectToCorrectHome()} />
				<Route path='/chercheur/candidaturesSpontanees/:id' element={isLoggedInChercheur ? <CandidatureSpontaneeChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/profile' element={isLoggedInChercheur ? <ProfileChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/enregistrements' element={isLoggedInChercheur ? <EnregistrementsChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/favoris' element={isLoggedInChercheur ? <FavorisChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/relations' element={isLoggedInChercheur ? <RelationsChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/relations/groupes' element={isLoggedInChercheur ? <RelationsChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/relations/groupes/:id' element={isLoggedInChercheur ? <RelationsChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/relations/amis' element={isLoggedInChercheur ? <RelationsChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/relations/amis/:id' element={isLoggedInChercheur ? <RelationsChercheur /> : redirectToCorrectHome()} />
				<Route path='/chercheur/conventions' element={isLoggedInChercheur ? <ConventionsChercheur /> : redirectToCorrectHome()} />


				{/*  Etablissement */}

				<Route path='/etablissement/conventions' element={isLoggedInEtablissement ? <ConventionsEtablissement /> : redirectToCorrectHome()} />
				<Route path='/etablissement' element={isLoggedInEtablissement ? <HomeEtablissement /> : redirectToCorrectHome()} />
				<Route path='/etablissement/profile' element={isLoggedInEtablissement ? <ProfileEtablissement /> : redirectToCorrectHome()} />


			</Routes>
		</BrowserRouter>
	);
}

export default App;
