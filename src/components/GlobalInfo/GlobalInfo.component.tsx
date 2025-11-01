import { DatePicker, Form, Input, Select } from "antd";
import type { FormData } from "../../types";

interface GlobalInfoProps {
  onFormDataChange?: (data: FormData) => void;
}

const GlobalInfo = ({ onFormDataChange }: GlobalInfoProps) => {
  const [form] = Form.useForm();

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    const newFormData = {
      datetime: values.datetime || null,
      lieux: values.lieux || "",
      sexe: values.sexe || "",
      competition: values.competition || "",
      niveau: values.niveau || "",
    };
    if (onFormDataChange) {
      onFormDataChange(newFormData);
    }
  };

  return (
    <div>
      <Form form={form} layout="inline" onValuesChange={handleFormChange}>
        <Form.Item label="datetime" name="datetime">
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Lieux" name="lieux">
          <Input />
        </Form.Item>
        <Form.Item label="sexe" name="sexe">
          <Select
            showSearch
            placeholder="Choisis un élément"
            style={{ minWidth: "120px" }}
          >
            <Select.Option value="H">H</Select.Option>
            <Select.Option value="F">F</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Competition" name="competition">
          <Select
            showSearch
            placeholder="Choisis un élément"
            style={{ minWidth: "150px" }}
          >
            <Select.Option value="Internat">Internat</Select.Option>
            <Select.Option value="Champ">Champ</Select.Option>
            <Select.Option value="Coupe">Coupe</Select.Option>
            <Select.Option value="Amical">Amical</Select.Option>
            <Select.Option value="Magnus">Magnus</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="niveau" name="niveau">
          <Select
            showSearch
            placeholder="Choisis un élément"
            style={{ minWidth: "120px" }}
          >
            <Select.Option value="élite">élite</Select.Option>
            <Select.Option value="D1">D1</Select.Option>
            <Select.Option value="D2">D2</Select.Option>
            <Select.Option value="D3">D3</Select.Option>
            <Select.Option value="U20">U20</Select.Option>
            <Select.Option value="U17">U17</Select.Option>
            <Select.Option value="U15">U15</Select.Option>
            <Select.Option value="U13">U13</Select.Option>
            <Select.Option value="U11">U11</Select.Option>
            <Select.Option value="U09">U09</Select.Option>
            <Select.Option value="Loisir">Loisir</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GlobalInfo;
