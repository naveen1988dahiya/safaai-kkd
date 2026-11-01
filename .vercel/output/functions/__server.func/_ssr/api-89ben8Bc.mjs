import { i as TSS_SERVER_FUNCTION, n as createMiddleware, r as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-89ben8Bc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var TOKEN_KEY = "safai.session";
/** Cache is wiped on uninstall. If the login is left behind without it, require login again. */
function readToken() {
	try {
		return localStorage.getItem(TOKEN_KEY) ?? "";
	} catch {
		return "";
	}
}
var withSession = createMiddleware({ type: "function" }).client(async ({ next }) => next({ sendContext: { token: readToken() } })).server(async ({ next, context }) => next({ context: { token: context.token } }));
var readBoot_createServerFn_handler = createServerRpc({
	id: "2ca778c3ec41a5cc629f690da563ec9884498200d8ee067a5495ad21c7b5e476",
	name: "readBoot",
	filename: "src/lib/safai/api.ts"
}, (opts) => readBoot.__executeServer(opts));
var readBoot = createServerFn({ method: "GET" }).handler(readBoot_createServerFn_handler, async () => {
	const { getCookie } = await import("./ssr.mjs").then((n) => n.d).then((n) => n.t);
	const role = getCookie("safai_role");
	let username = "ADMIN";
	try {
		username = decodeURIComponent(getCookie("safai_user") || "ADMIN");
	} catch {
		username = "ADMIN";
	}
	if (role === "admin" || role === "inspector" || role === "subadmin") return {
		role,
		username
	};
	return {
		role: null,
		username: "ADMIN"
	};
});
var fetchSession_createServerFn_handler = createServerRpc({
	id: "4bad2fff7b095b0e18ec3fdc1a2eff9c8f37a53d881ddb4fc6be40bb488cccfd",
	name: "fetchSession",
	filename: "src/lib/safai/api.ts"
}, (opts) => fetchSession.__executeServer(opts));
var fetchSession = createServerFn({ method: "GET" }).middleware([withSession]).handler(fetchSession_createServerFn_handler, async ({ context }) => {
	const { getSession } = await import("./logic.server-CvCihTqS.mjs");
	return getSession(context.token);
});
var loginAdmin_createServerFn_handler = createServerRpc({
	id: "0ccbf872184d19fa0b69845ed6dbdd0947e12a61ffb4dd9ec754dbf4c540ee5d",
	name: "loginAdmin",
	filename: "src/lib/safai/api.ts"
}, (opts) => loginAdmin.__executeServer(opts));
var loginAdmin = createServerFn({ method: "POST" }).validator((input) => ({
	username: String(input?.username ?? ""),
	password: String(input?.password ?? "")
})).handler(loginAdmin_createServerFn_handler, async ({ data }) => {
	const { adminLogin } = await import("./logic.server-CvCihTqS.mjs");
	return adminLogin(data);
});
var loginInspector_createServerFn_handler = createServerRpc({
	id: "cd9c3dbc4a140fd4eeb0f1f2a81dade43941db0add9589e8ebf3af1a68c1966b",
	name: "loginInspector",
	filename: "src/lib/safai/api.ts"
}, (opts) => loginInspector.__executeServer(opts));
var loginInspector = createServerFn({ method: "POST" }).validator((input) => ({
	code: String(input?.code ?? ""),
	password: String(input?.password ?? ""),
	phone: String(input?.phone ?? "").trim().slice(0, 12)
})).handler(loginInspector_createServerFn_handler, async ({ data }) => {
	const { inspectorLogin } = await import("./logic.server-CvCihTqS.mjs");
	return inspectorLogin(data);
});
var signOut_createServerFn_handler = createServerRpc({
	id: "1a90800dc4eb5a45187750af4c131bca1aa18254f856c28271ef0a7bc505058c",
	name: "signOut",
	filename: "src/lib/safai/api.ts"
}, (opts) => signOut.__executeServer(opts));
var signOut = createServerFn({ method: "POST" }).middleware([withSession]).handler(signOut_createServerFn_handler, async ({ context }) => {
	const { logout } = await import("./logic.server-CvCihTqS.mjs");
	return logout(context.token);
});
var updateAdminPassword_createServerFn_handler = createServerRpc({
	id: "1020e9ef568649719973caac1c4db826d890549caf47dc5dd24f4e1bd6c2716a",
	name: "updateAdminPassword",
	filename: "src/lib/safai/api.ts"
}, (opts) => updateAdminPassword.__executeServer(opts));
var updateAdminPassword = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	current: String(input?.current ?? ""),
	next: String(input?.next ?? "")
})).handler(updateAdminPassword_createServerFn_handler, async ({ data, context }) => {
	const { changeAdminPassword } = await import("./logic.server-CvCihTqS.mjs");
	return changeAdminPassword(context.token, data);
});
var loadInspectorHome_createServerFn_handler = createServerRpc({
	id: "349c572328eeaccc5e1a86e1c60a6d0e5f4763598c2cc3969a801f50900b34b5",
	name: "loadInspectorHome",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadInspectorHome.__executeServer(opts));
var loadInspectorHome = createServerFn({ method: "GET" }).middleware([withSession]).handler(loadInspectorHome_createServerFn_handler, async ({ context }) => {
	const { inspectorHome } = await import("./logic.server-CvCihTqS.mjs");
	return inspectorHome(context.token);
});
var sendEntry_createServerFn_handler = createServerRpc({
	id: "216781699567bfe9a1eeea7b793b7e6bc227a1d3e6a55bd0fb72ac6227a09426",
	name: "sendEntry",
	filename: "src/lib/safai/api.ts"
}, (opts) => sendEntry.__executeServer(opts));
var sendEntry = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(sendEntry_createServerFn_handler, async ({ data, context }) => {
	const { submitEntry } = await import("./logic.server-CvCihTqS.mjs");
	return submitEntry(context.token, data);
});
var loadMyReports_createServerFn_handler = createServerRpc({
	id: "553263385ed5676d8c9fe30c3955ee5e5dcfff6f2c788d1a0c84d1ff96229a23",
	name: "loadMyReports",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadMyReports.__executeServer(opts));
var loadMyReports = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(loadMyReports_createServerFn_handler, async ({ data, context }) => {
	const { myReports } = await import("./logic.server-CvCihTqS.mjs");
	return myReports(context.token, data);
});
var loadDashboard_createServerFn_handler = createServerRpc({
	id: "eb8a95563e780b5a1e0aa12577d910b136586883033c914d14b026dd20a7ebd6",
	name: "loadDashboard",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadDashboard.__executeServer(opts));
var loadDashboard = createServerFn({ method: "GET" }).middleware([withSession]).handler(loadDashboard_createServerFn_handler, async ({ context }) => {
	const { adminDashboard } = await import("./logic.server-CvCihTqS.mjs");
	return adminDashboard(context.token);
});
var loadZones_createServerFn_handler = createServerRpc({
	id: "286336d2bfd756be65c1b02aee192f7d01ae7d7b966502aa976ec03e8b138328",
	name: "loadZones",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadZones.__executeServer(opts));
var loadZones = createServerFn({ method: "GET" }).middleware([withSession]).handler(loadZones_createServerFn_handler, async ({ context }) => {
	const { zoneDetail } = await import("./logic.server-CvCihTqS.mjs");
	return zoneDetail(context.token);
});
var saveZoneFn_createServerFn_handler = createServerRpc({
	id: "f026f0392b173e317f45f64c81b2aa9ac6eb55f7edf1f02a6466a54339c1ab08",
	name: "saveZoneFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => saveZoneFn.__executeServer(opts));
var saveZoneFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(saveZoneFn_createServerFn_handler, async ({ data, context }) => {
	const { saveZone } = await import("./logic.server-CvCihTqS.mjs");
	return saveZone(context.token, data);
});
var inspectorSessionsFn_createServerFn_handler = createServerRpc({
	id: "e8b404788587ec9dc44270bcc31c7bf7bac45539aa57472213eb31ca3efeb946",
	name: "inspectorSessionsFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => inspectorSessionsFn.__executeServer(opts));
var inspectorSessionsFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((id) => Number(id)).handler(inspectorSessionsFn_createServerFn_handler, async ({ data, context }) => {
	const { inspectorSessions } = await import("./logic.server-CvCihTqS.mjs");
	return inspectorSessions(context.token, data);
});
var logoutInspectorFn_createServerFn_handler = createServerRpc({
	id: "a63aa489b9e8b93bbf742327abfed8fac8d28677a61ac9e1e77bc115e898249a",
	name: "logoutInspectorFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => logoutInspectorFn.__executeServer(opts));
var logoutInspectorFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	inspectorId: Number(input?.inspectorId),
	sessionId: String(input?.sessionId ?? "")
})).handler(logoutInspectorFn_createServerFn_handler, async ({ data, context }) => {
	const { logoutInspector } = await import("./logic.server-CvCihTqS.mjs");
	return logoutInspector(context.token, data);
});
var replaceInspectorFn_createServerFn_handler = createServerRpc({
	id: "9636ee0cd4e9509824acc29abe8be2f62178e50c13e459b81c5958e4c084cf11",
	name: "replaceInspectorFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => replaceInspectorFn.__executeServer(opts));
var replaceInspectorFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(replaceInspectorFn_createServerFn_handler, async ({ data, context }) => {
	const { replaceInspector } = await import("./logic.server-CvCihTqS.mjs");
	return replaceInspector(context.token, data);
});
var deleteInspectorFn_createServerFn_handler = createServerRpc({
	id: "1fc424d92db3c77ee33747e884994ecfcaa50535dbae6353b26cb52a96acabe1",
	name: "deleteInspectorFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => deleteInspectorFn.__executeServer(opts));
var deleteInspectorFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((id) => Number(id)).handler(deleteInspectorFn_createServerFn_handler, async ({ data, context }) => {
	const { deleteInspector } = await import("./logic.server-CvCihTqS.mjs");
	return deleteInspector(context.token, data);
});
var saveCouncillorFn_createServerFn_handler = createServerRpc({
	id: "bb9b713377b234b428c701364306242786faccef68f784e0da505c5b4b8ab4f1",
	name: "saveCouncillorFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => saveCouncillorFn.__executeServer(opts));
var saveCouncillorFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(saveCouncillorFn_createServerFn_handler, async ({ data, context }) => {
	const { saveCouncillor } = await import("./logic.server-CvCihTqS.mjs");
	return saveCouncillor(context.token, data);
});
var loadNumbers_createServerFn_handler = createServerRpc({
	id: "d5a30c32c2aa5c06b6fea8c280a28424566f49ecc81491425c190b54d26e591b",
	name: "loadNumbers",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadNumbers.__executeServer(opts));
var loadNumbers = createServerFn({ method: "GET" }).middleware([withSession]).handler(loadNumbers_createServerFn_handler, async ({ context }) => {
	const { dailyBoard } = await import("./logic.server-CvCihTqS.mjs");
	return dailyBoard(context.token);
});
var assignNumberFn_createServerFn_handler = createServerRpc({
	id: "138ceb5bc259563b7006bb3b73049190830385dfa85aec5fbf372cda1ea5eaa0",
	name: "assignNumberFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => assignNumberFn.__executeServer(opts));
var assignNumberFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	zoneId: input?.zoneId === "all" ? "all" : Number(input?.zoneId),
	number: Number(input?.number)
})).handler(assignNumberFn_createServerFn_handler, async ({ data, context }) => {
	const { assignNumber } = await import("./logic.server-CvCihTqS.mjs");
	return assignNumber(context.token, data);
});
var removeNumberFn_createServerFn_handler = createServerRpc({
	id: "179294c2f5cc3a8971d59abc8f8dc3da3dbfeb41623cae4f550bae6f18caef67",
	name: "removeNumberFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => removeNumberFn.__executeServer(opts));
var removeNumberFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((id) => Number(id)).handler(removeNumberFn_createServerFn_handler, async ({ data, context }) => {
	const { removeNumber } = await import("./logic.server-CvCihTqS.mjs");
	return removeNumber(context.token, data);
});
var updateNumberFn_createServerFn_handler = createServerRpc({
	id: "d479bf1e6fda14efaf0814fd4b49dd398ff1ed1f89bfe78e2cbdc505973a0998",
	name: "updateNumberFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => updateNumberFn.__executeServer(opts));
var updateNumberFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(updateNumberFn_createServerFn_handler, async ({ data, context }) => {
	const { updateNumber } = await import("./logic.server-CvCihTqS.mjs");
	return updateNumber(context.token, data);
});
var loadLive_createServerFn_handler = createServerRpc({
	id: "cbc729a02511d3b2abe18fba12f5134b15d45408c2166d09159b83aae1b49646",
	name: "loadLive",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadLive.__executeServer(opts));
var loadLive = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(loadLive_createServerFn_handler, async ({ data, context }) => {
	const { liveFeed } = await import("./logic.server-CvCihTqS.mjs");
	return liveFeed(context.token, data);
});
var loadReport_createServerFn_handler = createServerRpc({
	id: "3d1d61576d6cff549369c20559f2f4a37ee0326aa6fb8657e88d018f322721bd",
	name: "loadReport",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadReport.__executeServer(opts));
var loadReport = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(loadReport_createServerFn_handler, async ({ data, context }) => {
	const { reportTable } = await import("./logic.server-CvCihTqS.mjs");
	return reportTable(context.token, data);
});
var loadInspectorReport_createServerFn_handler = createServerRpc({
	id: "784521d9ea1b0d0aebba920c248adb0865ac4cf67c56ae62db03842db7d784cb",
	name: "loadInspectorReport",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadInspectorReport.__executeServer(opts));
var loadInspectorReport = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(loadInspectorReport_createServerFn_handler, async ({ data, context }) => {
	const { inspectorWise } = await import("./logic.server-CvCihTqS.mjs");
	return inspectorWise(context.token, data);
});
var loadStaffDay_createServerFn_handler = createServerRpc({
	id: "2b64c615bc83922a391f9a1ff9a6e32a80015ba3e0233082dff6a8203d878c0c",
	name: "loadStaffDay",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadStaffDay.__executeServer(opts));
var loadStaffDay = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({ date: String(input?.date ?? "") })).handler(loadStaffDay_createServerFn_handler, async ({ data, context }) => {
	const { staffDay } = await import("./logic.server-CvCihTqS.mjs");
	return staffDay(context.token, data.date);
});
var saveStaffDay_createServerFn_handler = createServerRpc({
	id: "b139b3e57163e3fae2b8468a22140f084b988bdc66f3c43aa57849f4ea17f4c8",
	name: "saveStaffDay",
	filename: "src/lib/safai/api.ts"
}, (opts) => saveStaffDay.__executeServer(opts));
var saveStaffDay = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	date: String(input?.date ?? ""),
	rows: Array.isArray(input?.rows) ? input.rows.map((row) => ({
		id: Number(row.id),
		present: !!row.present,
		zoneId: row.zoneId == null ? null : Number(row.zoneId)
	})) : []
})).handler(saveStaffDay_createServerFn_handler, async ({ data, context }) => {
	const { saveStaffDay: save } = await import("./logic.server-CvCihTqS.mjs");
	return save(context.token, data);
});
var loadAttendanceView_createServerFn_handler = createServerRpc({
	id: "cecfd461bc3ac360c9fbb8ac5e55c3ff2ef08953020b48016a92570e20e73a67",
	name: "loadAttendanceView",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadAttendanceView.__executeServer(opts));
var loadAttendanceView = createServerFn({ method: "GET" }).middleware([withSession]).handler(loadAttendanceView_createServerFn_handler, async ({ context }) => {
	const { attendanceView } = await import("./logic.server-CvCihTqS.mjs");
	return attendanceView(context.token);
});
var loadStaff_createServerFn_handler = createServerRpc({
	id: "6a57eb0daecf8cfe6f43e1348f830a1ee2a610c9a91f31bce325118590e2e827",
	name: "loadStaff",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadStaff.__executeServer(opts));
var loadStaff = createServerFn({ method: "GET" }).middleware([withSession]).handler(loadStaff_createServerFn_handler, async ({ context }) => {
	const { staffBoard } = await import("./logic.server-CvCihTqS.mjs");
	return staffBoard(context.token);
});
var addStaffFn_createServerFn_handler = createServerRpc({
	id: "883ea0b9da982350979794758301af961b8fe9c47f7f3649a5aa2525bb6ba10b",
	name: "addStaffFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => addStaffFn.__executeServer(opts));
var addStaffFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(addStaffFn_createServerFn_handler, async ({ data, context }) => {
	const { addStaff } = await import("./logic.server-CvCihTqS.mjs");
	return addStaff(context.token, data);
});
var patchStaffFn_createServerFn_handler = createServerRpc({
	id: "82bbbb013afc9ae867eec71e5635223f58f5a00a80c8b1cd381276bf5f541d89",
	name: "patchStaffFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => patchStaffFn.__executeServer(opts));
var patchStaffFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => input).handler(patchStaffFn_createServerFn_handler, async ({ data, context }) => {
	const { patchStaff } = await import("./logic.server-CvCihTqS.mjs");
	return patchStaff(context.token, data);
});
var deleteStaffFn_createServerFn_handler = createServerRpc({
	id: "4d4a99976b8cc718d742ab5b8e65714be7bb38e1a56daa316335ca92824821d5",
	name: "deleteStaffFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => deleteStaffFn.__executeServer(opts));
var deleteStaffFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((id) => Number(id)).handler(deleteStaffFn_createServerFn_handler, async ({ data, context }) => {
	const { deleteStaff } = await import("./logic.server-CvCihTqS.mjs");
	return deleteStaff(context.token, data);
});
var markAbsentFn_createServerFn_handler = createServerRpc({
	id: "2d8b7cc6ff3426c645bf3f6b35c3ccb376982043e7f824bf214f83a3fe3e8fe5",
	name: "markAbsentFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => markAbsentFn.__executeServer(opts));
var markAbsentFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	inspectorId: Number(input?.inspectorId),
	date: String(input?.date ?? ""),
	jhadu: Boolean(input?.jhadu),
	nali: Boolean(input?.nali),
	kooda: Boolean(input?.kooda),
	score: Number(input?.score)
})).handler(markAbsentFn_createServerFn_handler, async ({ data, context }) => {
	const { markAbsent } = await import("./logic.server-CvCihTqS.mjs");
	return markAbsent(context.token, data);
});
var loadMeta_createServerFn_handler = createServerRpc({
	id: "0771fc2b311b04c238d0eabda250c4b5187def3e30114b0cc2072bfb82f51edd",
	name: "loadMeta",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadMeta.__executeServer(opts));
var loadMeta = createServerFn({ method: "GET" }).middleware([withSession]).handler(loadMeta_createServerFn_handler, async ({ context }) => {
	const { metaLists } = await import("./logic.server-CvCihTqS.mjs");
	return metaLists(context.token);
});
var fileComplaint_createServerFn_handler = createServerRpc({
	id: "88cea3191aa65f426893eaf3a41053988debe0832c05b070da84978855ae0ae1",
	name: "fileComplaint",
	filename: "src/lib/safai/api.ts"
}, (opts) => fileComplaint.__executeServer(opts));
var fileComplaint = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	jhadu: Boolean(input?.jhadu),
	nali: Boolean(input?.nali),
	kooda: Boolean(input?.kooda)
})).handler(fileComplaint_createServerFn_handler, async ({ data, context }) => {
	const { fileComplaint } = await import("./logic.server-CvCihTqS.mjs");
	return fileComplaint(context.token, data);
});
var loadMyComplaints_createServerFn_handler = createServerRpc({
	id: "9453572876702f849bf9bdd0cdb366098d10792770fa07c7ea66752fda673c89",
	name: "loadMyComplaints",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadMyComplaints.__executeServer(opts));
var loadMyComplaints = createServerFn({ method: "GET" }).middleware([withSession]).handler(loadMyComplaints_createServerFn_handler, async ({ context }) => {
	const { myComplaints } = await import("./logic.server-CvCihTqS.mjs");
	return myComplaints(context.token);
});
var loadComplaintCount_createServerFn_handler = createServerRpc({
	id: "60fb429d913ad9da93b087e9c105e8f106c37a03c169bb083952732fe05a8cd4",
	name: "loadComplaintCount",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadComplaintCount.__executeServer(opts));
var loadComplaintCount = createServerFn({ method: "GET" }).middleware([withSession]).handler(loadComplaintCount_createServerFn_handler, async ({ context }) => {
	const { complaintCount } = await import("./logic.server-CvCihTqS.mjs");
	return complaintCount(context.token);
});
var loadComplaints_createServerFn_handler = createServerRpc({
	id: "6eba97864626db114adb0a446ef387e28d9fa3f5a9e6b7303ff46175bfc079ae",
	name: "loadComplaints",
	filename: "src/lib/safai/api.ts"
}, (opts) => loadComplaints.__executeServer(opts));
var loadComplaints = createServerFn({ method: "GET" }).middleware([withSession]).handler(loadComplaints_createServerFn_handler, async ({ context }) => {
	const { adminComplaints } = await import("./logic.server-CvCihTqS.mjs");
	return adminComplaints(context.token);
});
var markComplaintsSeen_createServerFn_handler = createServerRpc({
	id: "314a2c5341dfcb354fa66454e7e2a74d1a5b96f24ccdc56dbe39e374515cd350",
	name: "markComplaintsSeen",
	filename: "src/lib/safai/api.ts"
}, (opts) => markComplaintsSeen.__executeServer(opts));
var markComplaintsSeen = createServerFn({ method: "POST" }).middleware([withSession]).handler(markComplaintsSeen_createServerFn_handler, async ({ context }) => {
	const { markComplaintsSeen } = await import("./logic.server-CvCihTqS.mjs");
	return markComplaintsSeen(context.token);
});
function asLevelIn(value) {
	return value === "edit" || value === "view" ? value : "none";
}
var listSubAdminsFn_createServerFn_handler = createServerRpc({
	id: "cb9bac7798f5d4f79dd929621ea76d9db20883f4b0e903e732084706aa449070",
	name: "listSubAdminsFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => listSubAdminsFn.__executeServer(opts));
var listSubAdminsFn = createServerFn({ method: "GET" }).middleware([withSession]).handler(listSubAdminsFn_createServerFn_handler, async ({ context }) => {
	const { listSubAdmins } = await import("./logic.server-CvCihTqS.mjs");
	return listSubAdmins(context.token);
});
var saveSubAdminFn_createServerFn_handler = createServerRpc({
	id: "f4db5a150968ff5f86bc0b33c6561769a7cf1354f848751c4a1336b686acf6cf",
	name: "saveSubAdminFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => saveSubAdminFn.__executeServer(opts));
var saveSubAdminFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	id: input?.id ? Number(input.id) : void 0,
	name: String(input?.name ?? ""),
	username: String(input?.username ?? ""),
	password: String(input?.password ?? ""),
	active: input?.active !== false,
	attendance: asLevelIn(input?.attendance),
	zone: asLevelIn(input?.zone),
	number: asLevelIn(input?.number),
	staff: asLevelIn(input?.staff),
	councillor: asLevelIn(input?.councillor),
	zones: Array.isArray(input?.zones) ? input.zones.map((z) => ({
		id: Number(z.id),
		perm: asLevelIn(z.perm)
	})) : []
})).handler(saveSubAdminFn_createServerFn_handler, async ({ data, context }) => {
	const { saveSubAdmin } = await import("./logic.server-CvCihTqS.mjs");
	return saveSubAdmin(context.token, data);
});
var resetSubPasswordFn_createServerFn_handler = createServerRpc({
	id: "6cf39f96dec3f8ccfd61eeb80d305badc23d94e3c75cde92305cd5ec4b9a8e34",
	name: "resetSubPasswordFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => resetSubPasswordFn.__executeServer(opts));
var resetSubPasswordFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	id: Number(input?.id),
	password: String(input?.password ?? "")
})).handler(resetSubPasswordFn_createServerFn_handler, async ({ data, context }) => {
	const { resetSubPassword } = await import("./logic.server-CvCihTqS.mjs");
	return resetSubPassword(context.token, data);
});
var removeSubAdminFn_createServerFn_handler = createServerRpc({
	id: "3e18ac8da1fd16decb0b9354482a6289905c73351551be70b444bbf6460250d5",
	name: "removeSubAdminFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => removeSubAdminFn.__executeServer(opts));
var removeSubAdminFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((id) => Number(id)).handler(removeSubAdminFn_createServerFn_handler, async ({ data, context }) => {
	const { removeSubAdmin } = await import("./logic.server-CvCihTqS.mjs");
	return removeSubAdmin(context.token, data);
});
var changeOwnPasswordFn_createServerFn_handler = createServerRpc({
	id: "2489afbc7ff810fd55bda282de6d0e78114d8058bbbccb8c8821fcc3c58f50e7",
	name: "changeOwnPasswordFn",
	filename: "src/lib/safai/api.ts"
}, (opts) => changeOwnPasswordFn.__executeServer(opts));
var changeOwnPasswordFn = createServerFn({ method: "POST" }).middleware([withSession]).validator((input) => ({
	current: String(input?.current ?? ""),
	next: String(input?.next ?? "")
})).handler(changeOwnPasswordFn_createServerFn_handler, async ({ data, context }) => {
	const { changeOwnPassword } = await import("./logic.server-CvCihTqS.mjs");
	return changeOwnPassword(context.token, data);
});
//#endregion
export { addStaffFn_createServerFn_handler, assignNumberFn_createServerFn_handler, changeOwnPasswordFn_createServerFn_handler, deleteInspectorFn_createServerFn_handler, deleteStaffFn_createServerFn_handler, fetchSession_createServerFn_handler, fileComplaint_createServerFn_handler, inspectorSessionsFn_createServerFn_handler, listSubAdminsFn_createServerFn_handler, loadAttendanceView_createServerFn_handler, loadComplaintCount_createServerFn_handler, loadComplaints_createServerFn_handler, loadDashboard_createServerFn_handler, loadInspectorHome_createServerFn_handler, loadInspectorReport_createServerFn_handler, loadLive_createServerFn_handler, loadMeta_createServerFn_handler, loadMyComplaints_createServerFn_handler, loadMyReports_createServerFn_handler, loadNumbers_createServerFn_handler, loadReport_createServerFn_handler, loadStaffDay_createServerFn_handler, loadStaff_createServerFn_handler, loadZones_createServerFn_handler, loginAdmin_createServerFn_handler, loginInspector_createServerFn_handler, logoutInspectorFn_createServerFn_handler, markAbsentFn_createServerFn_handler, markComplaintsSeen_createServerFn_handler, patchStaffFn_createServerFn_handler, readBoot_createServerFn_handler, removeNumberFn_createServerFn_handler, removeSubAdminFn_createServerFn_handler, replaceInspectorFn_createServerFn_handler, resetSubPasswordFn_createServerFn_handler, saveCouncillorFn_createServerFn_handler, saveStaffDay_createServerFn_handler, saveSubAdminFn_createServerFn_handler, saveZoneFn_createServerFn_handler, sendEntry_createServerFn_handler, signOut_createServerFn_handler, updateAdminPassword_createServerFn_handler, updateNumberFn_createServerFn_handler };
