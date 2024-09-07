import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";

const RoleForm = () => {
	const [roleName, setRoleName] = useState("");
	const [roleStatus, setRoleStatus] = useState("");
	const [menuPermissions, setMenuPermissions] = useState([]);
	const [allChecked, setAllChecked] = useState(false);
	const [menus, setMenus] = useState([]); // Menüler için state

	useEffect(() => {
		const fetchMenus = async () => {
			try {
				const response = await axios.get('/api/menus'); // Menüler için API çağrısı
				const fetchedMenus = response.data;

				// Sadece menuParentId'si 0 olan menüleri filtrele
				const filteredMenus = fetchedMenus.filter(menu => menu.menuParentId === 0);
				setMenus(filteredMenus);

				// Başlangıç izinlerini ayarla
				const initialPermissions = filteredMenus.map((menu) => ({
					menu_id: menu.menuId,
					permission_show: false,
					permission_add: false,
					permission_update: false,
					permission_delete: false,
					permission_datatable: false,
				}));
				setMenuPermissions(initialPermissions);
			} catch (error) {
				console.error('Menüler çekilirken hata oluştu:', error);
			}
		};

		fetchMenus();
	}, []);

	const handlePermissionChange = (menuId, permissionType, value) => {
		setMenuPermissions((prevPermissions) =>
			prevPermissions.map((permission) =>
				permission.menu_id === menuId
					? { ...permission, [permissionType]: value }
					: permission
			)
		);
	};

	const handleSelectAll = () => {
		const newCheckedState = !allChecked;
		setAllChecked(newCheckedState);

		// Tüm izinleri güncelleme
		setMenuPermissions((prevPermissions) =>
			prevPermissions.map((permission) => ({
				...permission,
				permission_show: newCheckedState,
				permission_add: newCheckedState,
				permission_update: newCheckedState,
				permission_delete: newCheckedState,
				permission_datatable: newCheckedState,
			}))
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const permissionsList = menuPermissions.map((permission) => ({
			menuId: permission.menu_id,
			permissionShow: permission.permission_show,
			permissionAdd: permission.permission_add,
			permissionUpdate: permission.permission_update,
			permissionDelete: permission.permission_delete,
			permissionDatatable: permission.permission_datatable,
		}));

		const roleData = {
			roleName: roleName,
			roleStatus: roleStatus,
			permissions: permissionsList,
		};

		console.log(roleData);  // Gönderilen veriyi kontrol edin

		try {
			await axios.post("/api/roles", roleData);
			console.log("Role eklendi");
		} catch (error) {
			console.error("Role eklenirken hata oluştu:", error.response ? error.response.data : error.message);
		}
	};

	return (
		<div className="container mt-4">
			<h4 className="mb-3">{roleName ? "Update Role" : "Add Role"}</h4>
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col md={6}>
						<Form.Group controlId="roleName" className="mb-3">
							<Form.Label>Rol Adı</Form.Label>
							<Form.Control
								type="text"
								value={roleName}
								onChange={(e) => setRoleName(e.target.value)}
								placeholder="Rol Adı"
								required
							/>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group controlId="roleStatus" className="mb-3">
							<Form.Label>Durum</Form.Label>
							<Form.Control
								as="select"
								value={roleStatus}
								onChange={(e) => setRoleStatus(e.target.value)}
								required
							>
								<option value="">Lütfen Durumu Seçiniz</option>
								<option value="1">Aktif</option>
								<option value="2">Pasif</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>

				<Form.Group className="mb-3">
					<Form.Check
						type="checkbox"
						id="tumunuSec"
						label="Tümünü İşaretle"
						checked={allChecked}
						onChange={handleSelectAll}
					/>
				</Form.Group>

				<div className="permissions-section">
					<h5>Menü İzinleri</h5>
					<Row>
						{menuPermissions.map((permission) => (
							<Col md={4} key={permission.menu_id}>
								<Form.Group className="mb-3">
									<Form.Label>
										{menus.find(menu => menu.menuId === permission.menu_id)?.menuName || "Menü Adı"}
									</Form.Label>
									{["show", "add", "update", "delete", "datatable"].map(
										(action) => (
											<Form.Check
												key={action}
												type="checkbox"
												id={`${action}_${permission.menu_id}`}
												label={action.charAt(0).toUpperCase() + action.slice(1)}
												checked={permission[`permission_${action}`]} // Checkbox state'i buradan alır
												onChange={(e) =>
													handlePermissionChange(
														permission.menu_id,
														`permission_${action}`,
														e.target.checked
													)
												}
											/>
										)
									)}
								</Form.Group>
							</Col>
						))}
					</Row>
				</div>

				<Button variant="primary" type="submit">
					{roleName ? "Update Role" : "Add Role"}
				</Button>
			</Form>
		</div>
	);
};

export default RoleForm;