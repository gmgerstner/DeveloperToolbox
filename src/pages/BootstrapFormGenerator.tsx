import React, { useState, useId } from 'react';
import { copyToClipboard, download } from '../lib/browser-io';

/**
 * Escapes special HTML characters in strings for safe attribute and content rendering.
 */
function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export type ControlType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'date'
  | 'time'
  | 'color'
  | 'range'
  | 'file'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'switch'
  | 'radio';

export type ValidationState = 'none' | 'valid' | 'invalid';
export type FormLayout = 'vertical' | 'horizontal' | 'floating';
export type GridColumnSize = '12' | '6' | '4' | '3' | 'auto';

export interface FormFieldOption {
  id: string;
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  name: string;
  type: ControlType;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  validationState?: ValidationState;
  validFeedback?: string;
  invalidFeedback?: string;
  inputGroupPrefix?: string;
  inputGroupSuffix?: string;
  options?: FormFieldOption[];
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  colSize?: GridColumnSize;
}

const DEFAULT_OPTIONS: FormFieldOption[] = [
  { id: 'opt-1', label: 'Option 1', value: 'opt1' },
  { id: 'opt-2', label: 'Option 2', value: 'opt2' },
  { id: 'opt-3', label: 'Option 3', value: 'opt3' }
];

export default function BootstrapFormGenerator() {
  const baseId = useId();
  const [layout, setLayout] = useState<FormLayout>('vertical');
  const [formTitle, setFormTitle] = useState('Contact & Registration Form');
  const [submitButtonText, setSubmitButtonText] = useState('Submit Form');
  const [showResetButton, setShowResetButton] = useState(true);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'html'>('editor');
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>('full-name');
  const [enableValidationScripts, setEnableValidationScripts] = useState(true);

  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'full-name',
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
      placeholder: 'John Doe',
      required: true,
      colSize: '6',
      helpText: 'Enter your legal first and last name.',
      validationState: 'none',
      validFeedback: 'Looks good!',
      invalidFeedback: 'Please provide your full name.'
    },
    {
      id: 'email-address',
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'user@example.com',
      required: true,
      colSize: '6',
      inputGroupPrefix: '@',
      helpText: 'We will never share your email with third parties.',
      validationState: 'none',
      validFeedback: 'Valid email address format.',
      invalidFeedback: 'Please enter a valid email address.'
    },
    {
      id: 'password-input',
      name: 'password',
      type: 'password',
      label: 'Account Password',
      placeholder: '••••••••',
      required: true,
      colSize: '6',
      helpText: 'Must be at least 8 characters with numbers and symbols.',
      validationState: 'none'
    },
    {
      id: 'phone-number',
      name: 'phoneNumber',
      type: 'tel',
      label: 'Phone Number',
      placeholder: '+1 (555) 000-0000',
      required: false,
      colSize: '6',
      inputGroupPrefix: '📞',
      validationState: 'none'
    },
    {
      id: 'department-select',
      name: 'department',
      type: 'select',
      label: 'Department',
      required: true,
      colSize: '6',
      options: [
        { id: 'dept-gen', label: 'General Inquiry', value: 'general' },
        { id: 'dept-sup', label: 'Technical Support', value: 'support' },
        { id: 'dept-bil', label: 'Billing & Accounts', value: 'billing' }
      ],
      defaultValue: 'general',
      validationState: 'none'
    },
    {
      id: 'experience-range',
      name: 'experienceLevel',
      type: 'range',
      label: 'Experience Level (Years)',
      min: 1,
      max: 10,
      step: 1,
      defaultValue: '5',
      colSize: '6',
      helpText: 'Slide between 1 and 10 years of experience.',
      validationState: 'none'
    },
    {
      id: 'message-body',
      name: 'message',
      type: 'textarea',
      label: 'Inquiry Details / Comments',
      placeholder: 'Describe your request or question in detail...',
      rows: 4,
      required: true,
      colSize: '12',
      validationState: 'none',
      validFeedback: 'Thank you for providing details.',
      invalidFeedback: 'Please provide more details.'
    },
    {
      id: 'attachment-file',
      name: 'attachment',
      type: 'file',
      label: 'Attach Relevant Document',
      colSize: '12',
      helpText: 'Acceptable formats: PDF, DOCX, PNG (Max 10MB)',
      validationState: 'none'
    },
    {
      id: 'contact-pref',
      name: 'contactPreference',
      type: 'radio',
      label: 'Preferred Contact Method',
      colSize: '12',
      options: [
        { id: 'pref-email', label: 'Email', value: 'email' },
        { id: 'pref-phone', label: 'Phone', value: 'phone' },
        { id: 'pref-sms', label: 'SMS / Text Message', value: 'sms' }
      ],
      defaultValue: 'email',
      validationState: 'none'
    },
    {
      id: 'newsletter-switch',
      name: 'newsletter',
      type: 'switch',
      label: 'Subscribe to weekly developer updates and security digests',
      colSize: '12',
      defaultValue: 'true',
      validationState: 'none'
    },
    {
      id: 'terms-agreement',
      name: 'termsAgreed',
      type: 'checkbox',
      label: 'I accept and agree to the Terms of Service & Privacy Policy',
      required: true,
      colSize: '12',
      validationState: 'none',
      validFeedback: 'Agreement acknowledged.',
      invalidFeedback: 'You must accept the terms before submitting.'
    }
  ]);

  const selectedField = fields.find((f) => f.id === selectedFieldId) || fields[0] || null;

  const handleAddField = () => {
    const newFieldId = `field-${Date.now().toString(36)}`;
    const newField: FormField = {
      id: newFieldId,
      name: `field_${fields.length + 1}`,
      type: 'text',
      label: `New Field ${fields.length + 1}`,
      placeholder: 'Enter value...',
      required: false,
      colSize: '12',
      validationState: 'none'
    };
    setFields([...fields, newField]);
    setSelectedFieldId(newFieldId);
  };

  const handleRemoveField = (idToRemove: string) => {
    const updated = fields.filter((f) => f.id !== idToRemove);
    setFields(updated);
    if (selectedFieldId === idToRemove) {
      setSelectedFieldId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const handleMoveField = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === fields.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...fields];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setFields(updated);
  };

  const handleUpdateField = (fieldId: string, updates: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id === fieldId) {
          return { ...f, ...updates };
        }
        return f;
      })
    );
  };

  const handleAddOption = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (!field) return;
    const currentOptions = field.options || [];
    const newOpt: FormFieldOption = {
      id: `opt-${Date.now().toString(36)}`,
      label: `Option ${currentOptions.length + 1}`,
      value: `option_${currentOptions.length + 1}`
    };
    handleUpdateField(fieldId, { options: [...currentOptions, newOpt] });
  };

  const handleUpdateOption = (
    fieldId: string,
    optionId: string,
    key: 'label' | 'value',
    val: string
  ) => {
    const field = fields.find((f) => f.id === fieldId);
    if (!field || !field.options) return;
    const updatedOptions = field.options.map((opt) =>
      opt.id === optionId ? { ...opt, [key]: val } : opt
    );
    handleUpdateField(fieldId, { options: updatedOptions });
  };

  const handleRemoveOption = (fieldId: string, optionId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (!field || !field.options) return;
    const updatedOptions = field.options.filter((opt) => opt.id !== optionId);
    handleUpdateField(fieldId, { options: updatedOptions });
  };

  /**
   * Generates production-ready, accessible HTML markup for Bootstrap 5 forms.
   */
  const generateBootstrapHtml = (): string => {
    const lines: string[] = [];

    lines.push('<!-- Bootstrap 5 Form Generated with Developer Toolbox -->');
    lines.push('<form class="needs-validation" novalidate>');

    if (formTitle) {
      lines.push(`  <h2 class="mb-4">${escapeHtml(formTitle)}</h2>`);
    }

    lines.push('  <div class="row g-3">');

    fields.forEach((field) => {
      const colClass = field.colSize ? `col-md-${field.colSize}` : 'col-12';
      const isFloating = layout === 'floating' && ['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'time', 'textarea', 'select'].includes(field.type);
      const isHorizontal = layout === 'horizontal';

      let validationClass = '';
      if (field.validationState === 'valid') validationClass = ' is-valid';
      if (field.validationState === 'invalid') validationClass = ' is-invalid';

      const requiredAttr = field.required ? ' required' : '';
      const disabledAttr = field.disabled ? ' disabled' : '';
      const readonlyAttr = field.readOnly ? ' readonly' : '';

      lines.push(`    <div class="${colClass}">`);

      if (field.type === 'checkbox' || field.type === 'switch') {
        const switchClass = field.type === 'switch' ? ' form-switch' : '';
        lines.push(`      <div class="form-check${switchClass}">`);
        lines.push(
          `        <input class="form-check-input${validationClass}" type="checkbox" id="${field.id}" name="${field.name}"${field.defaultValue === 'true' ? ' checked' : ''}${requiredAttr}${disabledAttr}>`
        );
        lines.push(
          `        <label class="form-check-label" for="${field.id}">${escapeHtml(field.label)}${field.required ? ' <span class="text-danger">*</span>' : ''}</label>`
        );
        if (field.helpText) {
          lines.push(`        <div class="form-text">${escapeHtml(field.helpText)}</div>`);
        }
        if (field.validFeedback) {
          lines.push(`        <div class="valid-feedback">${escapeHtml(field.validFeedback)}</div>`);
        }
        if (field.invalidFeedback) {
          lines.push(`        <div class="invalid-feedback">${escapeHtml(field.invalidFeedback)}</div>`);
        }
        lines.push('      </div>');
      } else if (field.type === 'radio') {
        lines.push(`      <fieldset class="mb-2">`);
        lines.push(`        <legend class="col-form-label pt-0 fw-semibold">${escapeHtml(field.label)}${field.required ? ' <span class="text-danger">*</span>' : ''}</legend>`);
        (field.options || DEFAULT_OPTIONS).forEach((opt, idx) => {
          const optId = `${field.id}_opt_${idx}`;
          const isChecked = field.defaultValue === opt.value || (!field.defaultValue && idx === 0);
          lines.push(`        <div class="form-check">`);
          lines.push(
            `          <input class="form-check-input${validationClass}" type="radio" name="${field.name}" id="${optId}" value="${escapeHtml(opt.value)}"${isChecked ? ' checked' : ''}${requiredAttr}${disabledAttr}>`
          );
          lines.push(
            `          <label class="form-check-label" for="${optId}">${escapeHtml(opt.label)}</label>`
          );
          lines.push(`        </div>`);
        });
        if (field.helpText) {
          lines.push(`        <div class="form-text">${escapeHtml(field.helpText)}</div>`);
        }
        if (field.validFeedback) {
          lines.push(`        <div class="valid-feedback d-block">${escapeHtml(field.validFeedback)}</div>`);
        }
        if (field.invalidFeedback) {
          lines.push(`        <div class="invalid-feedback d-block">${escapeHtml(field.invalidFeedback)}</div>`);
        }
        lines.push(`      </fieldset>`);
      } else if (isHorizontal) {
        lines.push('      <div class="row align-items-center">');
        lines.push(`        <label for="${field.id}" class="col-sm-3 col-form-label">${escapeHtml(field.label)}${field.required ? ' <span class="text-danger">*</span>' : ''}</label>`);
        lines.push('        <div class="col-sm-9">');
        renderControlHtml(field, lines, validationClass, requiredAttr, disabledAttr, readonlyAttr, '          ');
        lines.push('        </div>');
        lines.push('      </div>');
      } else if (isFloating) {
        lines.push('      <div class="form-floating">');
        renderFloatingControlHtml(field, lines, validationClass, requiredAttr, disabledAttr, readonlyAttr, '        ');
        lines.push(`        <label for="${field.id}">${escapeHtml(field.label)}${field.required ? ' *' : ''}</label>`);
        if (field.helpText) {
          lines.push(`        <div class="form-text">${escapeHtml(field.helpText)}</div>`);
        }
        if (field.validFeedback) {
          lines.push(`        <div class="valid-feedback">${escapeHtml(field.validFeedback)}</div>`);
        }
        if (field.invalidFeedback) {
          lines.push(`        <div class="invalid-feedback">${escapeHtml(field.invalidFeedback)}</div>`);
        }
        lines.push('      </div>');
      } else {
        lines.push(`      <label for="${field.id}" class="form-label">${escapeHtml(field.label)}${field.required ? ' <span class="text-danger">*</span>' : ''}</label>`);
        renderControlHtml(field, lines, validationClass, requiredAttr, disabledAttr, readonlyAttr, '      ');
      }

      lines.push('    </div>');
    });

    lines.push('  </div>');
    lines.push('  <div class="mt-4 d-flex gap-2">');
    lines.push(`    <button class="btn btn-primary" type="submit">${escapeHtml(submitButtonText)}</button>`);
    if (showResetButton) {
      lines.push('    <button class="btn btn-secondary" type="reset">Reset Form</button>');
    }
    lines.push('  </div>');
    lines.push('</form>');

    if (enableValidationScripts) {
      lines.push('');
      lines.push('<script>');
      lines.push('(function () {');
      lines.push("  'use strict';");
      lines.push("  var forms = document.querySelectorAll('.needs-validation');");
      lines.push('  Array.prototype.slice.call(forms).forEach(function (form) {');
      lines.push("    form.addEventListener('submit', function (event) {");
      lines.push('      if (!form.checkValidity()) {');
      lines.push('        event.preventDefault();');
      lines.push('        event.stopPropagation();');
      lines.push('      }');
      lines.push("      form.classList.add('was-validated');");
      lines.push('    }, false);');
      lines.push('  });');
      lines.push('})();');
      lines.push('</script>');
    }

    return lines.join('\n');
  };

  const renderControlHtml = (
    field: FormField,
    lines: string[],
    validationClass: string,
    requiredAttr: string,
    disabledAttr: string,
    readonlyAttr: string,
    indent: string
  ) => {
    const hasInputGroup = Boolean(field.inputGroupPrefix || field.inputGroupSuffix);

    if (hasInputGroup) {
      lines.push(`${indent}<div class="input-group">`);
      if (field.inputGroupPrefix) {
        lines.push(`${indent}  <span class="input-group-text">${escapeHtml(field.inputGroupPrefix)}</span>`);
      }
    }

    const currentIndent = hasInputGroup ? `${indent}  ` : indent;

    if (field.type === 'textarea') {
      const rowsAttr = field.rows ? ` rows="${field.rows}"` : ' rows="3"';
      const placeholderAttr = field.placeholder ? ` placeholder="${escapeHtml(field.placeholder)}"` : '';
      lines.push(
        `${currentIndent}<textarea class="form-control${validationClass}" id="${field.id}" name="${field.name}"${rowsAttr}${placeholderAttr}${requiredAttr}${disabledAttr}${readonlyAttr}>${escapeHtml(field.defaultValue || '')}</textarea>`
      );
    } else if (field.type === 'select') {
      lines.push(
        `${currentIndent}<select class="form-select${validationClass}" id="${field.id}" name="${field.name}"${requiredAttr}${disabledAttr}>`
      );
      if (field.placeholder) {
        lines.push(`${currentIndent}  <option value="" disabled selected>${escapeHtml(field.placeholder)}</option>`);
      }
      (field.options || DEFAULT_OPTIONS).forEach((opt) => {
        const isSelected = field.defaultValue === opt.value ? ' selected' : '';
        lines.push(
          `${currentIndent}  <option value="${escapeHtml(opt.value)}"${isSelected}>${escapeHtml(opt.label)}</option>`
        );
      });
      lines.push(`${currentIndent}</select>`);
    } else if (field.type === 'range') {
      const minAttr = field.min !== undefined ? ` min="${field.min}"` : '';
      const maxAttr = field.max !== undefined ? ` max="${field.max}"` : '';
      const stepAttr = field.step !== undefined ? ` step="${field.step}"` : '';
      const valueAttr = field.defaultValue ? ` value="${escapeHtml(field.defaultValue)}"` : '';
      lines.push(
        `${currentIndent}<input type="range" class="form-range${validationClass}" id="${field.id}" name="${field.name}"${minAttr}${maxAttr}${stepAttr}${valueAttr}${disabledAttr}>`
      );
    } else if (field.type === 'file') {
      lines.push(
        `${currentIndent}<input class="form-control${validationClass}" type="file" id="${field.id}" name="${field.name}"${requiredAttr}${disabledAttr}>`
      );
    } else if (field.type === 'color') {
      const valueAttr = field.defaultValue ? ` value="${escapeHtml(field.defaultValue)}"` : ' value="#0d6efd"';
      lines.push(
        `${currentIndent}<input type="color" class="form-control form-control-color${validationClass}" id="${field.id}" name="${field.name}"${valueAttr}${requiredAttr}${disabledAttr}>`
      );
    } else {
      const placeholderAttr = field.placeholder ? ` placeholder="${escapeHtml(field.placeholder)}"` : '';
      const valueAttr = field.defaultValue ? ` value="${escapeHtml(field.defaultValue)}"` : '';
      lines.push(
        `${currentIndent}<input type="${field.type}" class="form-control${validationClass}" id="${field.id}" name="${field.name}"${placeholderAttr}${valueAttr}${requiredAttr}${disabledAttr}${readonlyAttr}>`
      );
    }

    if (hasInputGroup) {
      if (field.inputGroupSuffix) {
        lines.push(`${indent}  <span class="input-group-text">${escapeHtml(field.inputGroupSuffix)}</span>`);
      }
      lines.push(`${indent}</div>`);
    }

    if (field.helpText) {
      lines.push(`${indent}<div class="form-text">${escapeHtml(field.helpText)}</div>`);
    }
    if (field.validFeedback) {
      lines.push(`${indent}<div class="valid-feedback">${escapeHtml(field.validFeedback)}</div>`);
    }
    if (field.invalidFeedback) {
      lines.push(`${indent}<div class="invalid-feedback">${escapeHtml(field.invalidFeedback)}</div>`);
    }
  };

  const renderFloatingControlHtml = (
    field: FormField,
    lines: string[],
    validationClass: string,
    requiredAttr: string,
    disabledAttr: string,
    readonlyAttr: string,
    indent: string
  ) => {
    if (field.type === 'textarea') {
      const rowsAttr = field.rows ? ` style="height: ${field.rows * 28}px"` : ' style="height: 100px"';
      lines.push(
        `${indent}<textarea class="form-control${validationClass}" placeholder="${escapeHtml(field.label)}" id="${field.id}" name="${field.name}"${rowsAttr}${requiredAttr}${disabledAttr}${readonlyAttr}>${escapeHtml(field.defaultValue || '')}</textarea>`
      );
    } else if (field.type === 'select') {
      lines.push(
        `${indent}<select class="form-select${validationClass}" id="${field.id}" name="${field.name}"${requiredAttr}${disabledAttr}>`
      );
      (field.options || DEFAULT_OPTIONS).forEach((opt) => {
        const isSelected = field.defaultValue === opt.value ? ' selected' : '';
        lines.push(
          `${indent}  <option value="${escapeHtml(opt.value)}"${isSelected}>${escapeHtml(opt.label)}</option>`
        );
      });
      lines.push(`${indent}</select>`);
    } else {
      const valueAttr = field.defaultValue ? ` value="${escapeHtml(field.defaultValue)}"` : '';
      lines.push(
        `${indent}<input type="${field.type}" class="form-control${validationClass}" id="${field.id}" name="${field.name}" placeholder="${escapeHtml(field.label)}"${valueAttr}${requiredAttr}${disabledAttr}${readonlyAttr}>`
      );
    }
  };

  const generatedHtml = generateBootstrapHtml();

  const handleCopy = () => {
    copyToClipboard(generatedHtml, 'Bootstrap form HTML copied to clipboard!');
  };

  const handleDownload = () => {
    download('bootstrap-form.html', generatedHtml);
  };

  return (
    <div className="container-fluid py-4" id={baseId}>
      <header className="mb-4 pb-2 border-bottom">
        <h1 className="h3 fw-bold text-primary">Bootstrap Form Generator</h1>
        <p className="text-muted mb-0">
          Build accessible, responsive Bootstrap 5 forms with interactive field customization, live preview, grid layout, and HTML export.
        </p>
      </header>

      {/* Global Form Settings Bar */}
      <div className="card shadow-sm mb-4">
        <div className="card-body bg-light">
          <div className="row g-3 align-items-center">
            <div className="col-md-3">
              <label htmlFor="cfg-form-title" className="form-label fw-semibold">Form Heading</label>
              <input
                id="cfg-form-title"
                type="text"
                className="form-control"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. User Registration"
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="cfg-form-layout" className="form-label fw-semibold">Layout Mode</label>
              <select
                id="cfg-form-layout"
                className="form-select"
                value={layout}
                onChange={(e) => setLayout(e.target.value as FormLayout)}
              >
                <option value="vertical">Vertical (Default)</option>
                <option value="horizontal">Horizontal (Grid)</option>
                <option value="floating">Floating Labels</option>
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="cfg-submit-btn" className="form-label fw-semibold">Submit Button</label>
              <input
                id="cfg-submit-btn"
                type="text"
                className="form-control"
                value={submitButtonText}
                onChange={(e) => setSubmitButtonText(e.target.value)}
              />
            </div>
            <div className="col-md-2 pt-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="cfg-show-reset"
                  checked={showResetButton}
                  onChange={(e) => setShowResetButton(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="cfg-show-reset">Show Reset Button</label>
              </div>
            </div>
            <div className="col-md-3 pt-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="cfg-val-scripts"
                  checked={enableValidationScripts}
                  onChange={(e) => setEnableValidationScripts(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="cfg-val-scripts">Include Validation JS</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === 'editor' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            ✏️ Form Builder & Field Editor
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === 'preview' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            👁️ Live Rendered Preview
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === 'html' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('html')}
          >
            📄 Generated HTML & Export
          </button>
        </li>
      </ul>

      {/* Tab 1: Editor */}
      {activeTab === 'editor' && (
        <div className="row g-4">
          {/* Field List Sidebar */}
          <div className="col-lg-5">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                <span className="fw-bold">Form Fields ({fields.length})</span>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={handleAddField}
                >
                  + Add Field
                </button>
              </div>
              <div className="list-group list-group-flush" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {fields.map((f, index) => {
                  const isSelected = f.id === selectedFieldId;
                  return (
                    <div
                      key={f.id}
                      className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                        isSelected ? 'active text-white' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedFieldId(f.id)}
                    >
                      <div className="me-2 text-truncate">
                        <div className="fw-semibold">{f.label || '(Untitled)'}</div>
                        <small className={isSelected ? 'text-white-50' : 'text-muted'}>
                          <code>{f.type}</code> • col-{f.colSize || '12'} {f.required && '• Required'}
                        </small>
                      </div>
                      <div className="btn-group btn-group-sm" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className={`btn ${isSelected ? 'btn-outline-light' : 'btn-outline-secondary'}`}
                          title="Move Up"
                          disabled={index === 0}
                          onClick={() => handleMoveField(index, 'up')}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className={`btn ${isSelected ? 'btn-outline-light' : 'btn-outline-secondary'}`}
                          title="Move Down"
                          disabled={index === fields.length - 1}
                          onClick={() => handleMoveField(index, 'down')}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className={`btn ${isSelected ? 'btn-danger' : 'btn-outline-danger'}`}
                          title="Delete Field"
                          onClick={() => handleRemoveField(f.id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
                {fields.length === 0 && (
                  <div className="p-4 text-center text-muted">
                    No form fields. Click "+ Add Field" to create one.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Field Property Editor */}
          <div className="col-lg-7">
            {selectedField ? (
              <div className="card shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="card-title mb-0 fw-bold">Edit Field: {selectedField.label}</h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Control Type</label>
                      <select
                        className="form-select"
                        value={selectedField.type}
                        onChange={(e) =>
                          handleUpdateField(selectedField.id, {
                            type: e.target.value as ControlType,
                            options: ['select', 'radio'].includes(e.target.value) && !selectedField.options
                              ? DEFAULT_OPTIONS
                              : selectedField.options
                          })
                        }
                      >
                        <option value="text">Text (Single Line)</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="number">Number</option>
                        <option value="tel">Telephone / Phone</option>
                        <option value="url">URL Address</option>
                        <option value="date">Date Picker</option>
                        <option value="time">Time Picker</option>
                        <option value="color">Color Picker</option>
                        <option value="range">Range Slider</option>
                        <option value="file">File Upload</option>
                        <option value="textarea">Textarea (Multi-line)</option>
                        <option value="select">Dropdown Select</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="switch">Switch Toggle</option>
                        <option value="radio">Radio Buttons Group</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Field Label</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedField.label}
                        onChange={(e) => handleUpdateField(selectedField.id, { label: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Field ID / Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedField.name}
                        onChange={(e) =>
                          handleUpdateField(selectedField.id, {
                            name: e.target.value,
                            id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Grid Width (Bootstrap Col)</label>
                      <select
                        className="form-select"
                        value={selectedField.colSize || '12'}
                        onChange={(e) =>
                          handleUpdateField(selectedField.id, {
                            colSize: e.target.value as GridColumnSize
                          })
                        }
                      >
                        <option value="12">Full Width (col-md-12 / 100%)</option>
                        <option value="6">Half Width (col-md-6 / 50%)</option>
                        <option value="4">One Third (col-md-4 / 33.3%)</option>
                        <option value="3">One Quarter (col-md-3 / 25%)</option>
                      </select>
                    </div>

                    {/* Placeholder & Default Value */}
                    {!['checkbox', 'switch', 'file', 'color'].includes(selectedField.type) && (
                      <div className="col-md-6">
                        <label className="form-label">Placeholder Text</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedField.placeholder || ''}
                          onChange={(e) => handleUpdateField(selectedField.id, { placeholder: e.target.value })}
                        />
                      </div>
                    )}

                    <div className="col-md-6">
                      <label className="form-label">Default Value</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedField.defaultValue || ''}
                        onChange={(e) => handleUpdateField(selectedField.id, { defaultValue: e.target.value })}
                      />
                    </div>

                    {/* Help Text */}
                    <div className="col-12">
                      <label className="form-label">Help Text (.form-text)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedField.helpText || ''}
                        onChange={(e) => handleUpdateField(selectedField.id, { helpText: e.target.value })}
                        placeholder="Guidance or description shown under the control"
                      />
                    </div>

                    {/* Input Group Addons */}
                    {!['checkbox', 'switch', 'radio', 'range', 'file'].includes(selectedField.type) && (
                      <>
                        <div className="col-md-6">
                          <label className="form-label">Input Group Prefix</label>
                          <input
                            type="text"
                            className="form-control"
                            value={selectedField.inputGroupPrefix || ''}
                            onChange={(e) =>
                              handleUpdateField(selectedField.id, { inputGroupPrefix: e.target.value })
                            }
                            placeholder="e.g. $, @, https://"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Input Group Suffix</label>
                          <input
                            type="text"
                            className="form-control"
                            value={selectedField.inputGroupSuffix || ''}
                            onChange={(e) =>
                              handleUpdateField(selectedField.id, { inputGroupSuffix: e.target.value })
                            }
                            placeholder="e.g. .00, @example.com"
                          />
                        </div>
                      </>
                    )}

                    {/* Range / Textarea Specific Options */}
                    {selectedField.type === 'range' && (
                      <>
                        <div className="col-md-4">
                          <label className="form-label">Min</label>
                          <input
                            type="number"
                            className="form-control"
                            value={selectedField.min ?? 0}
                            onChange={(e) => handleUpdateField(selectedField.id, { min: Number(e.target.value) })}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Max</label>
                          <input
                            type="number"
                            className="form-control"
                            value={selectedField.max ?? 100}
                            onChange={(e) => handleUpdateField(selectedField.id, { max: Number(e.target.value) })}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Step</label>
                          <input
                            type="number"
                            className="form-control"
                            value={selectedField.step ?? 1}
                            onChange={(e) => handleUpdateField(selectedField.id, { step: Number(e.target.value) })}
                          />
                        </div>
                      </>
                    )}

                    {selectedField.type === 'textarea' && (
                      <div className="col-md-4">
                        <label className="form-label">Rows</label>
                        <input
                          type="number"
                          className="form-control"
                          value={selectedField.rows ?? 3}
                          onChange={(e) => handleUpdateField(selectedField.id, { rows: Number(e.target.value) })}
                        />
                      </div>
                    )}

                    {/* Options Manager for Select / Radio */}
                    {['select', 'radio'].includes(selectedField.type) && (
                      <div className="col-12 mt-3">
                        <div className="border rounded p-3 bg-light">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-semibold">Option Choices</span>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleAddOption(selectedField.id)}
                            >
                              + Add Option
                            </button>
                          </div>
                          {(selectedField.options || []).map((opt) => (
                            <div key={opt.id} className="row g-2 align-items-center mb-2">
                              <div className="col-5">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Label"
                                  value={opt.label}
                                  onChange={(e) =>
                                    handleUpdateOption(selectedField.id, opt.id, 'label', e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-5">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Value"
                                  value={opt.value}
                                  onChange={(e) =>
                                    handleUpdateOption(selectedField.id, opt.id, 'value', e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger w-100"
                                  onClick={() => handleRemoveOption(selectedField.id, opt.id)}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Validation Settings */}
                    <div className="col-12 mt-3">
                      <div className="border rounded p-3">
                        <h6 className="fw-semibold mb-3">Validation & Feedback States</h6>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label className="form-label">Validation Preview State</label>
                            <select
                              className="form-select"
                              value={selectedField.validationState || 'none'}
                              onChange={(e) =>
                                handleUpdateField(selectedField.id, {
                                  validationState: e.target.value as ValidationState
                                })
                              }
                            >
                              <option value="none">None (Standard)</option>
                              <option value="valid">Valid (is-valid)</option>
                              <option value="invalid">Invalid (is-invalid)</option>
                            </select>
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">Valid Feedback Text</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedField.validFeedback || ''}
                              onChange={(e) =>
                                handleUpdateField(selectedField.id, { validFeedback: e.target.value })
                              }
                              placeholder="Looks good!"
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">Invalid Feedback Text</label>
                            <input
                              type="text"
                              className="form-control"
                              value={selectedField.invalidFeedback || ''}
                              onChange={(e) =>
                                handleUpdateField(selectedField.id, { invalidFeedback: e.target.value })
                              }
                              placeholder="Please provide a valid entry."
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Attributes Toggles */}
                    <div className="col-12 mt-3 d-flex gap-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="field-required"
                          checked={Boolean(selectedField.required)}
                          onChange={(e) => handleUpdateField(selectedField.id, { required: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="field-required">Required Field</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="field-disabled"
                          checked={Boolean(selectedField.disabled)}
                          onChange={(e) => handleUpdateField(selectedField.id, { disabled: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="field-disabled">Disabled</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="field-readonly"
                          checked={Boolean(selectedField.readOnly)}
                          onChange={(e) => handleUpdateField(selectedField.id, { readOnly: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="field-readonly">Read-only</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card shadow-sm p-5 text-center text-muted">
                Select a field from the left panel to configure its properties.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Live Preview */}
      {activeTab === 'preview' && (
        <div className="card shadow-sm">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <span className="fw-bold">Live Form Render</span>
            <span className="badge bg-secondary">Bootstrap 5 Interactive Simulation</span>
          </div>
          <div className="card-body p-4">
            <form onSubmit={(e) => e.preventDefault()}>
              {formTitle && <h3 className="mb-4">{formTitle}</h3>}
              <div className="row g-3">
                {fields.map((field) => {
                  const colClass = field.colSize ? `col-md-${field.colSize}` : 'col-12';
                  const isFloating = layout === 'floating' && ['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'time', 'textarea', 'select'].includes(field.type);
                  const isHorizontal = layout === 'horizontal';

                  let validationClass = '';
                  if (field.validationState === 'valid') validationClass = ' is-valid';
                  if (field.validationState === 'invalid') validationClass = ' is-invalid';

                  return (
                    <div key={field.id} className={colClass}>
                      {field.type === 'checkbox' || field.type === 'switch' ? (
                        <div className={`form-check ${field.type === 'switch' ? 'form-switch' : ''}`}>
                          <input
                            className={`form-check-input${validationClass}`}
                            type="checkbox"
                            id={`prev-${field.id}`}
                            defaultChecked={field.defaultValue === 'true'}
                            disabled={field.disabled}
                            required={field.required}
                          />
                          <label className="form-check-label" htmlFor={`prev-${field.id}`}>
                            {field.label} {field.required && <span className="text-danger">*</span>}
                          </label>
                          {field.helpText && <div className="form-text">{field.helpText}</div>}
                          {field.validFeedback && <div className="valid-feedback">{field.validFeedback}</div>}
                          {field.invalidFeedback && <div className="invalid-feedback">{field.invalidFeedback}</div>}
                        </div>
                      ) : field.type === 'radio' ? (
                        <fieldset className="mb-2">
                          <legend className="col-form-label pt-0 fw-semibold">
                            {field.label} {field.required && <span className="text-danger">*</span>}
                          </legend>
                          {(field.options || DEFAULT_OPTIONS).map((opt, idx) => (
                            <div key={opt.id} className="form-check">
                              <input
                                className={`form-check-input${validationClass}`}
                                type="radio"
                                name={`prev-${field.name}`}
                                id={`prev-${field.id}-${idx}`}
                                defaultChecked={field.defaultValue === opt.value || (!field.defaultValue && idx === 0)}
                                disabled={field.disabled}
                              />
                              <label className="form-check-label" htmlFor={`prev-${field.id}-${idx}`}>
                                {opt.label}
                              </label>
                            </div>
                          ))}
                          {field.helpText && <div className="form-text">{field.helpText}</div>}
                          {field.validFeedback && <div className="valid-feedback d-block">{field.validFeedback}</div>}
                          {field.invalidFeedback && <div className="invalid-feedback d-block">{field.invalidFeedback}</div>}
                        </fieldset>
                      ) : isHorizontal ? (
                        <div className="row align-items-center">
                          <label htmlFor={`prev-${field.id}`} className="col-sm-3 col-form-label">
                            {field.label} {field.required && <span className="text-danger">*</span>}
                          </label>
                          <div className="col-sm-9">
                            {renderPreviewControl(field, validationClass)}
                          </div>
                        </div>
                      ) : isFloating ? (
                        <div className="form-floating">
                          {renderPreviewControl(field, validationClass, true)}
                          <label htmlFor={`prev-${field.id}`}>
                            {field.label} {field.required && '*'}
                          </label>
                          {field.helpText && <div className="form-text">{field.helpText}</div>}
                          {field.validFeedback && <div className="valid-feedback">{field.validFeedback}</div>}
                          {field.invalidFeedback && <div className="invalid-feedback">{field.invalidFeedback}</div>}
                        </div>
                      ) : (
                        <>
                          <label htmlFor={`prev-${field.id}`} className="form-label">
                            {field.label} {field.required && <span className="text-danger">*</span>}
                          </label>
                          {renderPreviewControl(field, validationClass)}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {submitButtonText}
                </button>
                {showResetButton && (
                  <button type="reset" className="btn btn-secondary">
                    Reset Form
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Generated HTML */}
      {activeTab === 'html' && (
        <div className="card shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
            <span className="fw-bold">Exportable HTML Code</span>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleCopy}>
                📋 Copy HTML
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleDownload}>
                💾 Download .html
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <textarea
              className="form-control font-monospace border-0 p-3"
              rows={22}
              readOnly
              value={generatedHtml}
              style={{ fontSize: '0.875rem', backgroundColor: '#f8f9fa' }}
            />
          </div>
        </div>
      )}
    </div>
  );

  function renderPreviewControl(field: FormField, validationClass: string, isFloating = false) {
    const hasInputGroup = !isFloating && Boolean(field.inputGroupPrefix || field.inputGroupSuffix);

    const control = (
      <>
        {field.type === 'textarea' ? (
          <textarea
            className={`form-control${validationClass}`}
            id={`prev-${field.id}`}
            placeholder={isFloating ? field.label : field.placeholder}
            rows={field.rows || 3}
            defaultValue={field.defaultValue}
            disabled={field.disabled}
            readOnly={field.readOnly}
            required={field.required}
          />
        ) : field.type === 'select' ? (
          <select
            className={`form-select${validationClass}`}
            id={`prev-${field.id}`}
            defaultValue={field.defaultValue}
            disabled={field.disabled}
            required={field.required}
          >
            {field.placeholder && <option value="" disabled>{field.placeholder}</option>}
            {(field.options || DEFAULT_OPTIONS).map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.type === 'range' ? (
          <input
            type="range"
            className={`form-range${validationClass}`}
            id={`prev-${field.id}`}
            min={field.min}
            max={field.max}
            step={field.step}
            defaultValue={field.defaultValue}
            disabled={field.disabled}
          />
        ) : field.type === 'color' ? (
          <input
            type="color"
            className={`form-control form-control-color${validationClass}`}
            id={`prev-${field.id}`}
            defaultValue={field.defaultValue || '#0d6efd'}
            disabled={field.disabled}
          />
        ) : field.type === 'file' ? (
          <input
            type="file"
            className={`form-control${validationClass}`}
            id={`prev-${field.id}`}
            disabled={field.disabled}
            required={field.required}
          />
        ) : (
          <input
            type={field.type}
            className={`form-control${validationClass}`}
            id={`prev-${field.id}`}
            placeholder={isFloating ? field.label : field.placeholder}
            defaultValue={field.defaultValue}
            disabled={field.disabled}
            readOnly={field.readOnly}
            required={field.required}
          />
        )}
      </>
    );

    if (hasInputGroup) {
      return (
        <>
          <div className="input-group">
            {field.inputGroupPrefix && <span className="input-group-text">{field.inputGroupPrefix}</span>}
            {control}
            {field.inputGroupSuffix && <span className="input-group-text">{field.inputGroupSuffix}</span>}
          </div>
          {field.helpText && <div className="form-text">{field.helpText}</div>}
          {field.validFeedback && <div className="valid-feedback">{field.validFeedback}</div>}
          {field.invalidFeedback && <div className="invalid-feedback">{field.invalidFeedback}</div>}
        </>
      );
    }

    if (isFloating) {
      return control;
    }

    return (
      <>
        {control}
        {field.helpText && <div className="form-text">{field.helpText}</div>}
        {field.validFeedback && <div className="valid-feedback">{field.validFeedback}</div>}
        {field.invalidFeedback && <div className="invalid-feedback">{field.invalidFeedback}</div>}
      </>
    );
  }
}