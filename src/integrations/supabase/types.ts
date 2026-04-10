export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      agendamentos: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          data: string | null
          id: string
          observacoes: string | null
          servico_id: string | null
          status: string | null
          tecnico_id: string | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          data?: string | null
          id?: string
          observacoes?: string | null
          servico_id?: string | null
          status?: string | null
          tecnico_id?: string | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          data?: string | null
          id?: string
          observacoes?: string | null
          servico_id?: string | null
          status?: string | null
          tecnico_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agendamentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      avaliacoes: {
        Row: {
          cliente_id: string | null
          comentario: string | null
          created_at: string | null
          id: string
          nota: number | null
        }
        Insert: {
          cliente_id?: string | null
          comentario?: string | null
          created_at?: string | null
          id?: string
          nota?: number | null
        }
        Update: {
          cliente_id?: string | null
          comentario?: string | null
          created_at?: string | null
          id?: string
          nota?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "avaliacoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          nome: string
          telefone: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          nome: string
          telefone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      clientes_master: {
        Row: {
          criado_em: string | null
          documento: string | null
          email_login: string | null
          id: string
          nome_cliente: string
          telefone: string | null
        }
        Insert: {
          criado_em?: string | null
          documento?: string | null
          email_login?: string | null
          id?: string
          nome_cliente: string
          telefone?: string | null
        }
        Update: {
          criado_em?: string | null
          documento?: string | null
          email_login?: string | null
          id?: string
          nome_cliente?: string
          telefone?: string | null
        }
        Relationships: []
      }
      configuracoes: {
        Row: {
          chave: string | null
          id: string
          valor: string | null
        }
        Insert: {
          chave?: string | null
          id?: string
          valor?: string | null
        }
        Update: {
          chave?: string | null
          id?: string
          valor?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          brand: string | null
          cep: string | null
          chassis: string | null
          city: string | null
          color: string | null
          cpf_cnpj: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          model: string | null
          neighborhood: string | null
          notes: string | null
          number: string | null
          payment_method: string | null
          phone: string
          plan: string | null
          plate: string | null
          renavam: string | null
          state: string | null
          status: string | null
          street: string | null
          technician_id: string | null
          technician_name: string | null
          updated_at: string | null
          vehicle_type: string | null
          year: string | null
        }
        Insert: {
          brand?: string | null
          cep?: string | null
          chassis?: string | null
          city?: string | null
          color?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          model?: string | null
          neighborhood?: string | null
          notes?: string | null
          number?: string | null
          payment_method?: string | null
          phone: string
          plan?: string | null
          plate?: string | null
          renavam?: string | null
          state?: string | null
          status?: string | null
          street?: string | null
          technician_id?: string | null
          technician_name?: string | null
          updated_at?: string | null
          vehicle_type?: string | null
          year?: string | null
        }
        Update: {
          brand?: string | null
          cep?: string | null
          chassis?: string | null
          city?: string | null
          color?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          model?: string | null
          neighborhood?: string | null
          notes?: string | null
          number?: string | null
          payment_method?: string | null
          phone?: string
          plan?: string | null
          plate?: string | null
          renavam?: string | null
          state?: string | null
          status?: string | null
          street?: string | null
          technician_id?: string | null
          technician_name?: string | null
          updated_at?: string | null
          vehicle_type?: string | null
          year?: string | null
        }
        Relationships: []
      }
      financeiro: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          descricao: string | null
          id: string
          tipo: string | null
          valor: number | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          tipo?: string | null
          valor?: number | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          tipo?: string | null
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "financeiro_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      frota_veiculos: {
        Row: {
          cliente_id: string | null
          id_rastremix: number
          ignicao: boolean | null
          latitude: number | null
          longitude: number | null
          placa: string | null
          ultima_atualizacao: string | null
          velocidade: number | null
        }
        Insert: {
          cliente_id?: string | null
          id_rastremix: number
          ignicao?: boolean | null
          latitude?: number | null
          longitude?: number | null
          placa?: string | null
          ultima_atualizacao?: string | null
          velocidade?: number | null
        }
        Update: {
          cliente_id?: string | null
          id_rastremix?: number
          ignicao?: boolean | null
          latitude?: number | null
          longitude?: number | null
          placa?: string | null
          ultima_atualizacao?: string | null
          velocidade?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "frota_veiculos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes_master"
            referencedColumns: ["id"]
          },
        ]
      }
      ia_logs: {
        Row: {
          created_at: string | null
          id: string
          pergunta: string | null
          resposta: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          pergunta?: string | null
          resposta?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          pergunta?: string | null
          resposta?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notificacoes: {
        Row: {
          created_at: string | null
          id: string
          lida: boolean | null
          mensagem: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lida?: boolean | null
          mensagem?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lida?: boolean | null
          mensagem?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notificacoes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          nome: string | null
          tipo: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          nome?: string | null
          tipo?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      servico_anexos: {
        Row: {
          created_at: string
          enviado_por: string | null
          id: string
          nome_arquivo: string
          servico_id: string
          tipo_arquivo: string | null
          url_arquivo: string
        }
        Insert: {
          created_at?: string
          enviado_por?: string | null
          id?: string
          nome_arquivo: string
          servico_id: string
          tipo_arquivo?: string | null
          url_arquivo: string
        }
        Update: {
          created_at?: string
          enviado_por?: string | null
          id?: string
          nome_arquivo?: string
          servico_id?: string
          tipo_arquivo?: string | null
          url_arquivo?: string
        }
        Relationships: [
          {
            foreignKeyName: "servico_anexos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      servico_historico: {
        Row: {
          alterado_por: string | null
          created_at: string
          id: string
          observacao: string | null
          servico_id: string
          status_anterior: string | null
          status_novo: string
        }
        Insert: {
          alterado_por?: string | null
          created_at?: string
          id?: string
          observacao?: string | null
          servico_id: string
          status_anterior?: string | null
          status_novo: string
        }
        Update: {
          alterado_por?: string | null
          created_at?: string
          id?: string
          observacao?: string | null
          servico_id?: string
          status_anterior?: string | null
          status_novo?: string
        }
        Relationships: [
          {
            foreignKeyName: "servico_historico_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      servicos: {
        Row: {
          created_at: string | null
          descricao: string | null
          id: string
          nome: string | null
          preco: number | null
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string | null
          preco?: number | null
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string | null
          preco?: number | null
        }
        Relationships: []
      }
      tec_services: {
        Row: {
          client_address: string | null
          client_name: string
          client_phone: string | null
          completed_date: string | null
          created_at: string | null
          id: string
          observations: string | null
          photos: Json | null
          plate: string | null
          scheduled_date: string | null
          signature: string | null
          status: string | null
          technician_id: string | null
          technician_name: string | null
          updated_at: string | null
          vehicle: string | null
        }
        Insert: {
          client_address?: string | null
          client_name: string
          client_phone?: string | null
          completed_date?: string | null
          created_at?: string | null
          id?: string
          observations?: string | null
          photos?: Json | null
          plate?: string | null
          scheduled_date?: string | null
          signature?: string | null
          status?: string | null
          technician_id?: string | null
          technician_name?: string | null
          updated_at?: string | null
          vehicle?: string | null
        }
        Update: {
          client_address?: string | null
          client_name?: string
          client_phone?: string | null
          completed_date?: string | null
          created_at?: string | null
          id?: string
          observations?: string | null
          photos?: Json | null
          plate?: string | null
          scheduled_date?: string | null
          signature?: string | null
          status?: string | null
          technician_id?: string | null
          technician_name?: string | null
          updated_at?: string | null
          vehicle?: string | null
        }
        Relationships: []
      }
      tecnicos: {
        Row: {
          ativo: boolean
          auth_user_id: string | null
          cargo: string | null
          created_at: string
          email: string | null
          id: string
          nome: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          auth_user_id?: string | null
          cargo?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nome: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          auth_user_id?: string | null
          cargo?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          address: string | null
          address_number: string | null
          admin_notes: string | null
          billing_email: string | null
          birth_date: string | null
          cellphone: string | null
          city: string | null
          complement: string | null
          created_at: string | null
          device_limit: number | null
          document: string | null
          due_day: number | null
          erro_log: string | null
          expiration_date: string | null
          fixed_phone: string | null
          full_name: string
          group_name: string | null
          id: string
          income: number | null
          login_email: string
          monthly_value: number | null
          neighborhood: string | null
          password: string | null
          permissions: Json | null
          rg: string | null
          state: string | null
          status: string | null
          status_sincronia: string | null
          support_phone: string | null
          sync_status: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          address_number?: string | null
          admin_notes?: string | null
          billing_email?: string | null
          birth_date?: string | null
          cellphone?: string | null
          city?: string | null
          complement?: string | null
          created_at?: string | null
          device_limit?: number | null
          document?: string | null
          due_day?: number | null
          erro_log?: string | null
          expiration_date?: string | null
          fixed_phone?: string | null
          full_name: string
          group_name?: string | null
          id?: string
          income?: number | null
          login_email: string
          monthly_value?: number | null
          neighborhood?: string | null
          password?: string | null
          permissions?: Json | null
          rg?: string | null
          state?: string | null
          status?: string | null
          status_sincronia?: string | null
          support_phone?: string | null
          sync_status?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          address_number?: string | null
          admin_notes?: string | null
          billing_email?: string | null
          birth_date?: string | null
          cellphone?: string | null
          city?: string | null
          complement?: string | null
          created_at?: string | null
          device_limit?: number | null
          document?: string | null
          due_day?: number | null
          erro_log?: string | null
          expiration_date?: string | null
          fixed_phone?: string | null
          full_name?: string
          group_name?: string | null
          id?: string
          income?: number | null
          login_email?: string
          monthly_value?: number | null
          neighborhood?: string | null
          password?: string | null
          permissions?: Json | null
          rg?: string | null
          state?: string | null
          status?: string | null
          status_sincronia?: string | null
          support_phone?: string | null
          sync_status?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      veiculos: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          id: string
          modelo: string | null
          placa: string | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          id?: string
          modelo?: string | null
          placa?: string | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          id?: string
          modelo?: string | null
          placa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "veiculos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      criar_servico: {
        Args: {
          p_cliente_id: string
          p_descricao?: string
          p_equipamento?: string
          p_marca?: string
          p_modelo?: string
          p_numero_serie?: string
          p_observacoes?: string
          p_prioridade?: string
          p_tecnico_id: string
          p_tipo_servico?: string
          p_titulo: string
        }
        Returns: {
          created_at: string | null
          descricao: string | null
          id: string
          nome: string | null
          preco: number | null
        }
        SetofOptions: {
          from: "*"
          to: "servicos"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      finalizar_servico: {
        Args: {
          p_finalizado_por?: string
          p_laudo_tecnico?: string
          p_observacoes?: string
          p_servico_id: string
        }
        Returns: {
          created_at: string | null
          descricao: string | null
          id: string
          nome: string | null
          preco: number | null
        }
        SetofOptions: {
          from: "*"
          to: "servicos"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      iniciar_servico: {
        Args: { p_servico_id: string; p_tecnico_id?: string }
        Returns: {
          created_at: string | null
          descricao: string | null
          id: string
          nome: string | null
          preco: number | null
        }
        SetofOptions: {
          from: "*"
          to: "servicos"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
